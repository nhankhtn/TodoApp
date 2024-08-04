use actix_web::{ dev::Service as _, get, middleware::Logger, web::Data, App, HttpServer, Responder };
use actix_cors::Cors;
use futures_util::future::FutureExt;
use env_logger::Env;

mod handlers;
mod models;
mod config;
use config::*;
mod routes;
use routes::*;
mod utils;
mod services;
mod helpers;

#[get("/")]
async fn index() -> impl Responder {
    "Hello world!!!"
}
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "info");
    std::env::set_var("RUST_BACKTRACE", "1");
    // env_logger::init();
    env_logger::init_from_env(Env::default().default_filter_or("info"));
    
    let (domain, port, url_database) = match read_env() {
        Ok((domain, port, url_database)) => {
            (domain, port, url_database)
        },
        Err(e) => {
            eprintln!("Error reading environment variables: {}", e);
            return Ok(());
        }
    };

    let database = connect_database(url_database).await.expect("Fail to connect database!");
    println!("Connection to database established!");

    let server = HttpServer::new(move || {
        let cors = Cors::default()
            .allowed_origin_fn(|_origin, _req_head| { true })
            .allowed_methods(vec!["GET", "POST", "PUT", "DELETE"])
            .allowed_headers(vec!["Content-Type"])
            .max_age(3600);
        App::new()
            .wrap(cors)
            .wrap(Logger::default())
            .wrap(Logger::new("%a %s %{User-Agent}i"))
            .wrap_fn(|req, srv| {
                println!("Hi from start. You requested: {}", req.path());
                srv.call(req).map(|res| {
                    println!("Hi from response");
                    res
                })
            })
            .app_data(Data::new(database.clone()))
            .service(index)
            .configure(api_scope)
    })
        .bind((domain.clone(), port))?
        .run();

    server.await
}
