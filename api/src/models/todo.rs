use serde::{ Deserialize, Serialize };
use sqlx::FromRow;

#[derive(Deserialize, Serialize, FromRow)]
pub struct Todo {
    pub id: i32,
    pub email: String,
    pub username: String,
    pub avatar: String,
}
impl Todo {
    pub fn new(id: i32, email: String, username: String, avatar: String) -> Todo {
        Todo {
            id,
            email,
            username,
            avatar,
        }
    }
}
#[derive(Deserialize)]
pub struct CreateTodo {
    pub email: String,
    pub username: String,
    pub avatar: String,
}
#[derive(Deserialize)]
pub struct UpdateTodo {
    pub id: i32,
    pub value: String,
}
