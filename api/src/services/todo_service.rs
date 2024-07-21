use sqlx::MySqlPool;

use crate::{ utils::TypeDbError, models::Todo };

pub async fn get_all_todos(db: &MySqlPool, user_id: i32) -> Result<Vec<Todo>, TypeDbError> {
    let result = sqlx
        ::query_as(
            "
            SELECT id, user_id, title, description, created_at
            FROM todos
            WHERE user_id = ? 
        "
        )
        .bind(user_id)
        .fetch_all(db).await
        .map_err(|e| TypeDbError::new(e.to_string()))?;

    Ok(result)
}

pub async fn create_todo(
    db: &MySqlPool,
    title: &str,
    description: &str,
    user_id: i32
) -> Result<Todo, TypeDbError> {
    sqlx
        ::query(
            "
        INSERT INTO todos(user_id, title, description) VALUES
        (?, ?, ?)
    "
        )
        .bind(&user_id)
        .bind(&title)
        .bind(&description)
        .execute(db).await
        .map_err(|e| TypeDbError::new(e.to_string()))?;

    let todo = sqlx
        ::query_as(
            "
                SELECT id, user_id, title, description, created_at
                FROM todos 
                WHERE user_id = ? and title = ? and description = ?
                ORDER BY created_at desc
                LIMIT 1
            "
        )
        .bind(&user_id)
        .bind(&title)
        .bind(&description)
        .fetch_one(db).await
        .map_err(|e| TypeDbError::new(e.to_string()))?;

    Ok(todo)
}

pub async fn delete_todo(db: &MySqlPool, user_id: i32, id: i32) -> Result<(), TypeDbError> {
    sqlx
        ::query("
        DELETE FROM todos WHERE id = ? and user_id = ? 
    ")
        .bind(id)
        .bind(user_id)
        .execute(db).await
        .map_err(|e| TypeDbError::new(e.to_string()))?;

    Ok(())
}

pub async fn update_todo(
    db: &MySqlPool,
    id: i32,
    user_id: i32,
    field: &str,
    value: &str
) -> Result<(), TypeDbError> {
    let query = match field {
        "title" => "UPDATE todos SET title = ? WHERE id = ? AND user_id = ?",
        "description" => "UPDATE todos SET description = ? WHERE id = ? AND user_id = ?",
        _ => {
            return Err(TypeDbError::new("Invalid field!".to_string()));
        }
    };

    sqlx
        ::query(query)
        .bind(value)
        .bind(id)
        .bind(user_id)
        .execute(db).await
        .map_err(|e| TypeDbError::new(e.to_string()))?;
    Ok(())
}
