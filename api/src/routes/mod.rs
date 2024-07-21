use actix_web::web::scope;

mod user_route;
mod todo_route;

pub fn api_scope(cfg: &mut actix_web::web::ServiceConfig) {
    cfg.service(scope("/api").service(user_route::user_scope()).service(todo_route::todo_scope()));
}
