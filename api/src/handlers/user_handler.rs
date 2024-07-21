use actix_web::{ web::{ Data, Json, Path }, HttpResponse, Responder };
use sqlx::MySqlPool;

use crate::{ models::{ CreateUser, UpdateUser }, services::user_service };

pub async fn get_all_users(db: Data<MySqlPool>) -> impl Responder {
    match user_service::get_all_users(&**db).await {
        Ok(users) => HttpResponse::Ok().json(users),
        Err(_e) => HttpResponse::InternalServerError().json(_e),
    }
}

pub async fn create_user(db: Data<MySqlPool>, body: Json<CreateUser>) -> impl Responder {
    match user_service::create_user(&**db, &body.email, &body.username, &body.avatar).await {
        Ok(user) => HttpResponse::Created().json(user),
        Err(_e) => HttpResponse::InternalServerError().json(_e),
    }
}

pub async fn delete_user(db: Data<MySqlPool>, id: Path<i32>) -> impl Responder {
    let id = id.into_inner();
    match user_service::delete_user(&**db, id).await {
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
    match user_service::update_user(&**db, field.as_str(), &body.value, body.id).await {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(e) => HttpResponse::InternalServerError().json(e),
    }
}
