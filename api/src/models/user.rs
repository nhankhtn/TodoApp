use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Deserialize, Serialize, FromRow)]
pub struct User {
    pub id: i32,
    pub email: String,
    pub username: String,
    pub password: String,
    pub avatar: String,
}

#[derive(Serialize, FromRow, Deserialize)]
pub struct UserAttributes {
    pub id: i32,
    pub email: String,
    pub username: String,
    pub avatar: String,
}
#[derive(Deserialize)]
pub struct CreateUser {
    pub email: String,
    pub username: String,
    pub password: String,
}
#[derive(Deserialize)]
pub struct UpdateUserById {
    pub id: i32,
    pub value: String,
}
#[derive(Deserialize)]
pub struct GetUserByEmailPassword {
    pub email: String,
    pub password: String,
}
#[derive(Serialize)]
pub struct AvatarUser {
    pub avatar: String,
}
