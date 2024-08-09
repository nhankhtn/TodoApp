use crate::handlers::user_handler;
use actix_web::{web, Scope};

pub fn user_scope() -> Scope {
    web::scope("/user")
        .route("/all", web::get().to(user_handler::get_all_users))
        .route(
            "/register",
            web::post().to(user_handler::register_by_email_and_password),
        )
        .route(
            "/{id}/delete",
            web::delete().to(user_handler::delete_user_by_id),
        )
        .route(
            "/{field}/update",
            web::patch().to(user_handler::update_user_by_id),
        )
        .route(
            "/login",
            web::post().to(user_handler::login_by_email_and_password),
        )
        .route("/auth", web::get().to(user_handler::authorization_user))
        .route(
            "/{user_id}/upload/avatar",
            web::patch().to(user_handler::upload_avatar),
        )
}
