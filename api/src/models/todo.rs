use serde::{Deserialize, Serialize};
use sqlx::{types::chrono::NaiveDateTime, FromRow};

#[derive(Deserialize, Serialize, FromRow)]
pub struct Todo {
    pub id: i32,
    pub user_id: i32,
    pub title: String,
    pub description: String,
    pub is_completed: bool,
    pub created_at: NaiveDateTime,
}
#[derive(Deserialize)]
pub struct CreateTodo {
    pub title: String,
    pub description: String,
}
#[derive(Deserialize)]
pub struct DeleteTodo {
    pub id: i32,
    pub user_id: i32,
}
#[derive(Deserialize)]
pub struct UpdateTodo {
    pub user_id: i32,
    pub id: i32,
    pub field: String,
}
#[derive(Deserialize)]
pub struct UpdateTodoBody {
    pub value: String,
}
