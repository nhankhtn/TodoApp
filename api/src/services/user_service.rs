use sqlx::MySqlPool;

use crate::{ utils::TypeDbError, models::User };

pub async fn get_all_users(db: &MySqlPool) -> Result<Vec<User>, TypeDbError> {
    let result = sqlx
        ::query_as("
            SELECT id, email, username, avatar 
            FROM users
        ")
        .fetch_all(db).await
        .map_err(|e| TypeDbError::new(e.to_string()))?;

    Ok(result)
}
pub async fn create_user(
    db: &MySqlPool,
    email: &str,
    username: &str,
    avatar: &str
) -> Result<User, TypeDbError> {
    let response = sqlx
        ::query("
        INSERT INTO users(email, username, avatar) VALUES
        (?, ?, ?)
    ")
        .bind(email)
        .bind(username)
        .bind(avatar)
        .execute(db).await
        .map_err(|e| TypeDbError::new(e.to_string()))?;

    Ok(
        User::new(
            response.last_insert_id() as i32,
            email.to_string(),
            username.to_string(),
            avatar.to_string()
        )
    )
}
pub async fn delete_user(db: &MySqlPool, id: i32) -> Result<(), TypeDbError> {
    sqlx
        ::query("DELETE FROM users WHERE id = ?")
        .bind(id)
        .execute(db).await
        .map_err(|e| TypeDbError::new(e.to_string()))?;

    Ok(())
}

pub async fn update_user(
    db: &MySqlPool,
    field: &str,
    value: &str,
    id: i32
) -> Result<(), TypeDbError> {
    let query = match field {
        "username" => "UPDATE users SET username = ? WHERE id = ?",
        "email" => "UPDATE users SET email = ? WHERE id = ?",
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
