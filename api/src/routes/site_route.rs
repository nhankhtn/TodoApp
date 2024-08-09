use crate::handlers::site_handler;
use actix_web::{web, Scope};

pub fn site_scope() -> Scope {
    web::scope("").route(
        "/images/{filename}",
        web::get().to(site_handler::serve_image),
    )
}
