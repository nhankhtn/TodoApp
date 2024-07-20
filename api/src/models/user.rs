use serde::{ Deserialize, Serialize };
use sqlx::FromRow;

#[derive(Deserialize, Serialize, FromRow)]
pub struct User {
    pub id: i32,
    pub email: String,
    pub username: String,
    pub avatar: String,
}
impl User {
    pub fn new(id: i32, email: String, username: String, avatar: String) -> User {
        User {
            id,
            email,
            username,
            avatar,
        }
    }
}
#[derive(Deserialize)]
pub struct CreateUser {
    pub email: String,
    pub username: String,
    pub avatar: String,
}
#[derive(Deserialize)]
pub struct UpdateUser {
    pub id: i32,
    pub value: String,
}
