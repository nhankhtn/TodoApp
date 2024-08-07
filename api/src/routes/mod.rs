use actix_web::web::scope;

pub mod site_route;
pub mod todo_route;
pub mod user_route;

pub fn api_scope(cfg: &mut actix_web::web::ServiceConfig) {
    cfg.service(
        scope("/api")
            .service(user_route::user_scope())
            .service(todo_route::todo_scope())
            .service(site_route::site_scope()),
    );
}
