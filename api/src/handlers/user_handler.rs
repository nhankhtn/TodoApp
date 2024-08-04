use actix_web::{ web::{ Data, Json, Path }, HttpResponse, Responder };
use sqlx::MySqlPool;

use crate::{ models::{ CreateUser, GetUserByEmailPassword, UpdateUserById }, services::user_service, utils::TypeDbError };

pub async fn get_all_users(db: Data<MySqlPool>) -> impl Responder {
    match user_service::get_all_users(&**db).await {
        Ok(users) => HttpResponse::Ok().json(users),
        Err(_e) => HttpResponse::InternalServerError().json(_e),
    }
}

pub async  fn get_user_by_email_and_password(db: Data<MySqlPool>, body: Json<GetUserByEmailPassword>) -> impl Responder {
    match user_service::get_user_by_email_and_password(&**db, &body.email, &body.password).await {
        Ok(user) => HttpResponse::Ok().json(user),
        Err(_e) => HttpResponse::NotFound().json(_e),
    }
} 

pub async fn create_user(db: Data<MySqlPool>, body: Json<CreateUser>) -> impl Responder {
    match user_service::create_user(&**db, &body.email, &body.username,&body.password, &body.avatar).await {
        Ok(user) => HttpResponse::Created().json(user),
        Err(TypeDbError::DuplicateEmail) => HttpResponse::Conflict().json("Email already exists"),
        Err(TypeDbError::Other(_e)) => HttpResponse::InternalServerError().json(_e),
    }
}

pub async fn delete_user_by_id(db: Data<MySqlPool>, id: Path<i32>) -> impl Responder {
    let id = id.into_inner();
    match user_service::delete_user_by_id(&**db, id).await {
        Ok(_) => HttpResponse::Ok(),
        Err(_) => HttpResponse::InternalServerError(),
    }
}

pub async fn update_user_by_id(
    db: Data<MySqlPool>,
    field: Path<String>,
    body: Json<UpdateUserById>
) -> impl Responder {
    let field = field.into_inner();
    match user_service::update_user_by_id(&**db, field.as_str(), &body.value, body.id).await {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(e) => HttpResponse::InternalServerError().json(e),
    }
}
