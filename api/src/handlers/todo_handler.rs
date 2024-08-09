use actix_web::{
    web::{Data, Json, Path, Query},
    HttpResponse, Responder,
};
use sqlx::MySqlPool;

use crate::{
    models::{
        CreateTodo, DeleteTodo, JsonApiResponse, Meta, PaginationParams, UpdateTodo, UpdateTodoBody,
    },
    services::todo_service,
};

pub async fn get_all_todos_by_id_user(
    db: Data<MySqlPool>,
    id: Path<i32>,
    query: Query<PaginationParams>,
) -> impl Responder {
    let user_id = id.into_inner();
    let limit = query.limit.unwrap_or(10);
    let offset = query.offset.unwrap_or(0);

    match todo_service::get_all_todos_by_id_user(&**db, limit, offset, user_id).await {
        Ok((todos, total)) => HttpResponse::Ok().json(JsonApiResponse {
            data: todos,
            metadata: Some(Meta { total, limit }),
        }),
        Err(_e) => HttpResponse::InternalServerError().json(_e),
    }
}

pub async fn create_todo(
    db: Data<MySqlPool>,
    body: Json<CreateTodo>,
    id: Path<i32>,
) -> impl Responder {
    let user_id = id.into_inner();

    match todo_service::create_todo(&**db, &body.title, &body.description, user_id).await {
        Ok(todo) => HttpResponse::Created().json(JsonApiResponse {
            data: todo,
            metadata: None,
        }),
        Err(_e) => HttpResponse::InternalServerError().json(_e),
    }
}

pub async fn delete_todo(db: Data<MySqlPool>, id: Path<DeleteTodo>) -> impl Responder {
    match todo_service::delete_todo(&**db, id.user_id, id.id).await {
        Ok(_) => HttpResponse::Ok(),
        Err(_) => HttpResponse::InternalServerError(),
    }
}

pub async fn update_todo(
    db: Data<MySqlPool>,
    path: Path<UpdateTodo>,
    body: Json<UpdateTodoBody>,
) -> impl Responder {
    match todo_service::update_todo(
        &**db,
        path.id,
        path.user_id,
        path.field.as_str(),
        body.value.as_str(),
    )
    .await
    {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(e) => HttpResponse::InternalServerError().json(e),
    }
}
