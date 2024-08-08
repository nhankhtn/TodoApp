use sqlx::{MySqlPool, Row};
use std::{convert::TryInto, usize};

use crate::{
    models::{user, Todo},
    utils::TypeDbError,
};

pub async fn get_all_todos_by_id_user(
    db: &MySqlPool,
    limit: usize,
    offset: usize,
    user_id: i32,
) -> Result<(Vec<Todo>, usize), TypeDbError> {
    let result: Vec<Todo> = sqlx::query_as(
        "
            SELECT id, user_id, title, description, is_completed, created_at
            FROM todos
            WHERE user_id = ? 
            LIMIT ? OFFSET ?
        ",
    )
    .bind(user_id)
    .bind(limit as i64)
    .bind(offset as i64)
    .fetch_all(db)
    .await
    .map_err(|e| TypeDbError::new(e.to_string()))?;

    let row = sqlx::query(
        "
             SELECT COUNT(*) as count FROM todos WHERE user_id = ? 
        ",
    )
    .bind(user_id)
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

pub async fn create_todo(
    db: &MySqlPool,
    title: &str,
    description: &str,
    user_id: i32,
) -> Result<Todo, TypeDbError> {
    sqlx::query(
        "
        INSERT INTO todos(user_id, title, description) VALUES
        (?, ?, ?)
    ",
    )
    .bind(&user_id)
    .bind(&title)
    .bind(&description)
    .execute(db)
    .await
    .map_err(|e| TypeDbError::new(e.to_string()))?;

    let todo: Todo = sqlx::query_as(
        "
                SELECT id, user_id, title, description,is_completed, created_at
                FROM todos 
                WHERE user_id = ? and title = ? and description = ?
                ORDER BY created_at desc
                LIMIT 1
            ",
    )
    .bind(&user_id)
    .bind(&title)
    .bind(&description)
    .fetch_one(db)
    .await
    .map_err(|e| TypeDbError::new(e.to_string()))?;

    Ok(todo)
}

pub async fn delete_todo(db: &MySqlPool, user_id: i32, id: i32) -> Result<(), TypeDbError> {
    sqlx::query(
        "
        DELETE FROM todos WHERE id = ? and user_id = ? 
    ",
    )
    .bind(id)
    .bind(user_id)
    .execute(db)
    .await
    .map_err(|e| TypeDbError::new(e.to_string()))?;

    Ok(())
}

pub async fn update_todo(
    db: &MySqlPool,
    id: i32,
    user_id: i32,
    field: &str,
    value: &str,
) -> Result<(), TypeDbError> {
    let query = match field {
        "title" => "UPDATE todos SET title = ? WHERE id = ? AND user_id = ?",
        "description" => "UPDATE todos SET description = ? WHERE id = ? AND user_id = ?",
        _ => {
            return Err(TypeDbError::new("Invalid field!".to_string()));
        }
    };

    sqlx::query(query)
        .bind(value)
        .bind(id)
        .bind(user_id)
        .execute(db)
        .await
        .map_err(|e| TypeDbError::new(e.to_string()))?;
    Ok(())
}
