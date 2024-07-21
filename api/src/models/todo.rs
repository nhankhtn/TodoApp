use serde::{ Deserialize, Serialize };
use sqlx::{ FromRow, types::chrono::NaiveDateTime };

#[derive(Deserialize, Serialize, FromRow)]
pub struct Todo {
    pub id: i32,
    pub user_id: i32,
    pub title: String,
    pub description: String,
    pub created_at: NaiveDateTime,
}
impl Todo {
    pub fn new(
        id: i32,
        user_id: i32,
        title: String,
        description: String,
        created_at: chrono::NaiveDateTime
    ) -> Todo {
        Todo {
            id,
            user_id,
            title,
            description,
            created_at,
        }
    }
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
    pub id: i32,
    pub user_id: i32,
    pub field: String,
}
#[derive(Deserialize)]
pub struct UpdateTodoBody {
    pub value: String,
}
