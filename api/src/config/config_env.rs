use dotenv::dotenv;
use std::env;

pub fn read_env() -> (String, u16, String) {
    dotenv().ok();

    let domain = env::var("BASE_DOMAIN").unwrap_or("127.0.0.1".to_string());
    let port = env
        ::var("PORT")
        .unwrap_or_else(|_| "8000".to_string())
        .parse()
        .unwrap();
    let url_database = env::var("URL_DATABASE").unwrap();

    (domain, port, url_database)
}
