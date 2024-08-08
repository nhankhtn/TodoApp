use crate::handlers::todo_handler;
use actix_web::{web, Scope};

pub fn todo_scope() -> Scope {
    web::scope("/todo")
        .route(
            "/all/{user_id}",
            web::get().to(todo_handler::get_all_todos_by_id_user),
        )
        .route(
            "/create/{user_id}",
            web::post().to(todo_handler::create_todo),
        )
        .route(
            "/{user_id}/{id}/delete",
            web::delete().to(todo_handler::delete_todo),
        )
        .route(
            "/{user_id}/{id}/{field}/update",
            web::patch().to(todo_handler::update_todo),
        )
}
