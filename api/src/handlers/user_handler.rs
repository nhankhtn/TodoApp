use actix_web::{ web::{ Data, Json, Path }, HttpResponse, Responder };
use sqlx::MySqlPool;

use crate::{ utils::TypeDbError, models::{ User, CreateUser, UpdateUser } };

pub async fn get_all_users(db: Data<MySqlPool>) -> impl Responder {
    let result: Result<Vec<User>, sqlx::Error> = sqlx
        ::query_as("
            SELECT id, email, username, avatar 
            FROM users
        ")
        .fetch_all(&**db).await;

    match result {
        Ok(users) => HttpResponse::Ok().json(users),
        Err(_e) => HttpResponse::InternalServerError().json(TypeDbError::new(_e.to_string())),
    }
}

pub async fn create_user(db: Data<MySqlPool>, body: Json<CreateUser>) -> impl Responder {
    let response = sqlx
        ::query("
        INSERT INTO users(email, username, avatar) VALUES
        (?, ?, ?)
    ")
        .bind(&body.email)
        .bind(&body.username)
        .bind(&body.avatar)
        .execute(&**db).await;
    println!("res: {:?}", &response);
    match response {
        Ok(id) =>
            HttpResponse::Created().json(
                User::new(
                    id.last_insert_id() as i32,
                    body.email.clone(),
                    body.username.clone(),
                    body.avatar.clone()
                )
            ),
        Err(_e) => HttpResponse::InternalServerError().json(TypeDbError::new(_e.to_string())),
    }
}

pub async fn delete_user(db: Data<MySqlPool>, id: Path<i32>) -> impl Responder {
    let user_id = id.into_inner();
    let response = sqlx
        ::query("
        DELETE FROM users WHERE id = ?
    ")
        .bind(user_id)
        .execute(&**db).await;

    match response {
        Ok(_) => HttpResponse::Ok(),
        Err(_) => HttpResponse::InternalServerError(),
    }
}

pub async fn update_user(
    db: Data<MySqlPool>,
    field: Path<String>,
    body: Json<UpdateUser>
) -> impl Responder {
    let field = field.into_inner();
    let query = match field.as_str() {
        "username" => "UPDATE users SET username = ? WHERE id = ?",
        "email" => "UPDATE users SET email = ? WHERE id = ?",
        "avatar" => "UPDATE users SET avatar = ? WHERE id = ?",
        _ => {
            return HttpResponse::BadRequest().body("Invalid field!");
        }
    };

    let response = sqlx::query(query).bind(&body.value).bind(&body.id).execute(&**db).await;
    match response {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(e) => HttpResponse::InternalServerError().body(format!("Error: {}", e)),
    }
}
