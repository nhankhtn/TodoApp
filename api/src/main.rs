use actix_cors::Cors;
use actix_multipart::form::tempfile::TempFileConfig;
use actix_web::{
    dev::Service as _, get, middleware::Logger, web::Data, App, HttpResponse, HttpServer, Responder,
};
use env_logger::Env;
use futures_util::future::FutureExt;

mod config;
mod handlers;
mod models;
use config::*;
mod routes;
use routes::*;
mod helpers;
mod services;
mod utils;

#[get("/")]
async fn index() -> impl Responder {
    let html = r#"<html>
        <head><title>Upload Test</title></head>
        <body>
            <form target="/" action="api/user/upload/avatar" method="post" enctype="multipart/form-data">
                <input type="file" name="file"/>
                <button type="submit">Submit</button>
            </form>
        </body>
    </html>"#;
    HttpResponse::Ok().body(html)
}
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // std::env::set_var("RUST_LOG", "info");
    // std::env::set_var("RUST_BACKTRACE", "1");
    // env_logger::init();
    env_logger::init_from_env(Env::default().default_filter_or("info"));

    let (domain, port, url_database) = match read_env() {
        Ok((domain, port, url_database)) => (domain, port, url_database),
        Err(e) => {
            eprintln!("Error reading environment variables: {}", e);
            return Ok(());
        }
    };

    let database = connect_database(url_database)
        .await
        .expect("Fail to connect database!");
    println!("Connection to database established!");

    std::fs::create_dir_all("./uploads")?;

    let server = HttpServer::new(move || {
        let cors = Cors::default()
            .allowed_origin_fn(|_origin, _req_head| true)
            .allowed_methods(vec!["GET", "POST", "PUT", "DELETE", "PATCH"])
            .allowed_headers(vec!["Content-Type", "Authorization"])
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
            .app_data(TempFileConfig::default().directory("./uploads"))
            .service(index)
            .configure(api_scope)
    })
    .bind((domain.clone(), port))?
    .run();

    server.await
}
