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
    let url_database = env::var("URL_DATABASE")
        .unwrap_or_else(|_| "mysql://root:Duynhan101220@4@localhost:3306/todoapp".to_string());
    Ok((domain, port, url_database))
}
pub fn get_key_secret_from_env() -> String {
    dotenv().ok();
    let key_secret = env::var("KEY_SECRET")
        .unwrap_or_else(|_| "YNTLCGJFcjCfTJOFtO5fvZI7ZNfZaFcrp42PUGAe3OA=".to_string());

    key_secret
}
pub fn get_url_api_images_from_env() -> String {
    dotenv().ok();
    let url_api_images =
        env::var("URL_IMAGES").unwrap_or_else(|_| "http://127.0.0.1:8080/api/images".to_string());

    url_api_images
}
