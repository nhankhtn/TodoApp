use actix_web::{ web, Scope };
use crate::handlers::user_handler;

pub fn user_scope() -> Scope {
    web::scope("/user")
        .route("/all", web::get().to(user_handler::get_all_users))
        .route("/create", web::post().to(user_handler::create_user))
        .route("/{id}", web::delete().to(user_handler::delete_user))
        .route("/{field}/update", web::patch().to(user_handler::update_user))
}
