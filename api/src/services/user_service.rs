use sqlx::MySqlPool;
use bcrypt::{DEFAULT_COST,hash, verify};

use crate::{ models::{User,UserResponse}, utils::TypeDbError };

pub async fn get_all_users(db: &MySqlPool) -> Result<Vec<UserResponse>, TypeDbError> {
    let result: Vec<UserResponse> = sqlx
        ::query_as("
            SELECT id, email, username, avatar 
            FROM users
        ")
        .fetch_all(db).await
        .map_err(|e| TypeDbError::new(e.to_string()))?;

    Ok(result)
}
pub async fn get_user_by_email_and_password(db: &MySqlPool, email: &str, password: &str) -> Result<UserResponse, TypeDbError> {
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
        Ok(UserResponse{
            id: user.id,
            email: user.email,
            username: user.username,
            avatar: user.avatar
        })
    } else {
        Err(TypeDbError::new("Invalid password".to_string()))
    }
}
pub async fn create_user(
    db: &MySqlPool,
    email: &str,
    username: &str,
    password: &str,
    avatar: &str
) -> Result<UserResponse, TypeDbError> {
    let password_hashed = hash(password, DEFAULT_COST).map_err(|e| TypeDbError::new(e.to_string()))?;

    let resp = sqlx
        ::query("
        INSERT INTO users(email, username, password, avatar) VALUES
        (?, ?, ?, ?)
    ")
        .bind(email)
        .bind(username)
        .bind(password_hashed)
        .bind(avatar)
        .execute(db).await
        .map_err(|e| TypeDbError::new(e.to_string()))?;

    Ok(
        UserResponse{
            id: resp.last_insert_id() as i32,
           email: email.to_string(),
           username: username.to_string(),
           avatar: avatar.to_string()
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
