use bcrypt::{hash, verify, DEFAULT_COST};
use chrono::{Duration, Utc};
use sqlx::{MySqlPool, Row};
use std::convert::TryInto;

use crate::{
    models::{Claims, User, UserAttributes},
    utils::{decode_token, encode_token, MessageError, TypeDbError},
};

pub async fn get_all_users(
    db: &MySqlPool,
    limit: usize,
    offset: usize,
) -> Result<(Vec<User>, usize), TypeDbError> {
    let result: Vec<User> = sqlx::query_as(
        "
            SELECT id, email, username, password, avatar 
            FROM users LIMIT ? OFFSET ?
        ",
    )
    .bind(limit as i64)
    .bind(offset as i64)
    .fetch_all(db)
    .await
    .map_err(|e| TypeDbError::new(e.to_string()))?;

    let row = sqlx::query(
        "
             SELECT COUNT(*) as count FROM users
        ",
    )
    .fetch_one(db)
    .await
    .map_err(|e| TypeDbError::new(e.to_string()))?;
    let count: i32 = row
        .try_get("count")
        .map_err(|e| TypeDbError::new(e.to_string()))?;
    let total: usize = count
        .try_into()
        .map_err(|_| TypeDbError::new("Failed to convert count to usize".to_string()))?;

    Ok((result, total))
}
pub async fn generate_token(
    db: &MySqlPool,
    email: &str,
    password: &str,
) -> Result<String, TypeDbError> {
    let user: User = sqlx::query_as(
        "
            SELECT id, email, username, password, avatar
            FROM users 
            WHERE email = ? 
        ",
    )
    .bind(email)
    .fetch_one(db)
    .await
    .map_err(|_| TypeDbError::new(MessageError::EMAIL_WRONG.to_string()))?;

    if verify(password, &user.password).unwrap_or(false) {
        // Ok(user)
        let exp = Duration::hours(100);
        let claims = Claims::new(user.id, exp);
        let token = encode_token(claims).map_err(|e| TypeDbError::new(e.to_string()))?;
        Ok(token)
    } else {
        Err(TypeDbError::new(MessageError::PASSWORD_WRONG.to_string()))
    }
}

pub async fn auth_token(db: &MySqlPool, token: String) -> Result<UserAttributes, TypeDbError> {
    let claims =
        decode_token(token).map_err(|_| TypeDbError::new("Token has error".to_string()))?;

    let current_time = Utc::now().timestamp() as usize;
    if claims.exp < current_time {
        return Err(TypeDbError::new("Token has expired".to_string()));
    }

    let user_id = claims.sub;
    let user = sqlx::query_as(
        "
            SELECT email, username, avatar
            FROM users
            WHERE id = ?
        ",
    )
    .bind(user_id)
    .fetch_one(db)
    .await
    .map_err(|_| TypeDbError::new("Token is invalid".to_string()))?;

    Ok(user)
}
pub async fn create_user(
    db: &MySqlPool,
    email: &str,
    username: &str,
    password: &str,
) -> Result<String, TypeDbError> {
    let password_hashed =
        hash(password, DEFAULT_COST).map_err(|e| TypeDbError::new(e.to_string()))?;

    let result = sqlx::query(
        "
        INSERT INTO users(email, username, password, avatar) VALUES
        (?, ?, ?, ?)  
    ",
    )
    .bind(email)
    .bind(username)
    .bind(password_hashed)
    .bind("".to_string())
    .execute(db)
    .await
    .map_err(|e| TypeDbError::new(e.to_string()))?;

    let exp = Duration::hours(100);
    let claims = Claims::new(result.last_insert_id() as i32, exp);
    let token = encode_token(claims).map_err(|e| TypeDbError::new(e.to_string()))?;
    Ok(token)
}
pub async fn delete_user_by_id(db: &MySqlPool, id: i32) -> Result<(), TypeDbError> {
    sqlx::query("DELETE FROM users WHERE id = ?")
        .bind(id)
        .execute(db)
        .await
        .map_err(|e| TypeDbError::new(e.to_string()))?;

    Ok(())
}

pub async fn update_user_by_id(
    db: &MySqlPool,
    field: &str,
    value: &str,
    id: i32,
) -> Result<(), TypeDbError> {
    let query = match field {
        "username" => "UPDATE users SET username = ? WHERE id = ?",
        "avatar" => "UPDATE users SET avatar = ? WHERE id = ?",
        _ => {
            return Err(TypeDbError::new("Invalid field!".to_string()));
        }
    };

    sqlx::query(query)
        .bind(value)
        .bind(id)
        .execute(db)
        .await
        .map_err(|e| TypeDbError::new(e.to_string()))?;

    Ok(())
}
