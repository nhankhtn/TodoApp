use sqlx::{MySqlPool, Row};
use bcrypt::{DEFAULT_COST,hash, verify};
use std::convert::TryInto;


use crate::{ models::{User, UserAttributes}, utils::TypeDbError };

pub async fn get_all_users(db: &MySqlPool, limit: usize, offset: usize) -> Result<(Vec<User>, usize), TypeDbError> {
    let result: Vec<User> = sqlx
        ::query_as("
            SELECT id, email, username, password, avatar 
            FROM users LIMIT ? OFFSET ?
        ")
        .bind(limit as i64)
        .bind(offset as i64)
        .fetch_all(db).await
        .map_err(|e| TypeDbError::new(e.to_string()))?;

    let row = sqlx
        ::query("
             SELECT COUNT(*) as count FROM users
        ")
    .fetch_one(db)
    .await.map_err(|e| TypeDbError::new(e.to_string()))?;
    let count: i32 = row.try_get("count").map_err(|e| TypeDbError::new(e.to_string()))?;
    let total: usize = count.try_into().map_err(|_| TypeDbError::new("Failed to convert count to usize".to_string()))?;

    Ok((result, total))  
}
pub async fn get_user_by_email_and_password(db: &MySqlPool, email: &str, password: &str) -> Result<User, TypeDbError> {
    let user: User = sqlx
        ::query_as("
            SELECT id, email, username, password, avatar
            FROM users 
            WHERE email = ? 
        ")
    .bind(email)
    .fetch_one(db).await
    .map_err(|e| TypeDbError::new(e.to_string()))?;
    
    if verify(password, &user.password).unwrap_or(false) {
        Ok(user)
    } else {
        Err(TypeDbError::new("Invalid password".to_string()))
    }
}
pub async fn create_user(
    db: &MySqlPool,
    email: &str,
    username: &str,
    password: &str,
) -> Result<UserAttributes, TypeDbError> {
    let password_hashed = hash(password, DEFAULT_COST).map_err(|e| TypeDbError::new(e.to_string()))?;

    sqlx
        ::query("
        INSERT INTO users(email, username, password, avatar) VALUES
        (?, ?, ?, ?)  
    ")
        .bind(email)
        .bind(username)
        .bind(password_hashed)
        .bind("".to_string())
        .execute(db).await
        .map_err(|e| TypeDbError::new(e.to_string()))?;

    Ok(
        UserAttributes{
           email: email.to_string(),
           username: username.to_string(),
           avatar: "".to_string()
        }
    )
}
pub async fn delete_user_by_id(db: &MySqlPool, id: i32) -> Result<(), TypeDbError> {
    sqlx
        ::query("DELETE FROM users WHERE id = ?")
        .bind(id)
        .execute(db).await
        .map_err(|e| TypeDbError::new(e.to_string()))?;

    Ok(())
}

pub async fn update_user_by_id(
    db: &MySqlPool,
    field: &str,
    value: &str,
    id: i32
) -> Result<(), TypeDbError> {
    let query = match field {
        "username" => "UPDATE users SET username = ? WHERE id = ?",
        "avatar" => "UPDATE users SET avatar = ? WHERE id = ?",
        _ => {
            return Err(TypeDbError::new("Invalid field!".to_string()));
        }
    };

    sqlx
        ::query(query)
        .bind(value)
        .bind(id)
        .execute(db).await
        .map_err(|e| TypeDbError::new(e.to_string()))?;

    Ok(())
}
