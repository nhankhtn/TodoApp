use dotenv::dotenv;
use std::env;

pub fn read_env() -> Result<(String, u16, String), String> {
    dotenv().ok();

    let domain = env::var("BASE_DOMAIN").unwrap_or_else(|_| "127.0.0.1".to_string());
    
    let port = env::var("PORT")
        .unwrap_or_else(|_| "8080".to_string())
        .parse()
        .map_err(|_| "Invalid port number".to_string())?;
    
    // let url_database = env::var("URL_DATABASE")
    //     .map_err(|_| "URL_DATABASE environment variable not set".to_string())?;
    let url_database = env::var("URL_DATABASE").unwrap_or_else(|_| "mysql://root:Duynhan101220@4@localhost:3306/todoapp".to_string());
    Ok((domain, port, url_database))
}