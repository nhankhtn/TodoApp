use actix_web::{ get, App, web::Data, HttpServer, Responder };

mod handlers;
mod models;
mod config;
use config::*;
mod routes;
use routes::*;
mod utils;

#[get("/")]
async fn index() -> impl Responder {
    "Hello world!!!"
}
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "info");
    std::env::set_var("RUST_BACKTRACE", "1");
    env_logger::init();

    let database = connect_database().await.expect("Fail to connect database!");
    println!("Connection to database established!");

    HttpServer::new(move || {
        App::new().app_data(Data::new(database.clone())).service(index).configure(api_scope)
    })
        .bind("127.0.0.1:8080")?
        .run().await
}
