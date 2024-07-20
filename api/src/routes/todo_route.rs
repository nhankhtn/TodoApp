use actix_web::{ web, Scope };
use crate::handlers::todo_handler;

pub fn todo_scope() -> Scope {
    web::scope("/todo")
        .route("/all", web::get().to(todo_handler::get_all_todos))
        .route("/create", web::post().to(todo_handler::create_todo))
        .route("/{id}", web::delete().to(todo_handler::delete_todo))
        .route("/{field}/update", web::patch().to(todo_handler::update_todo))
}
