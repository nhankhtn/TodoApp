use crate::models::Claims;
use actix_web::HttpRequest;
use jsonwebtoken::{decode, encode, errors, DecodingKey, EncodingKey, Header, Validation};

use super::TypeDbError;

pub fn encode_token(claims: Claims) -> Result<String, errors::Error> {
    let KEY_SECRET: &str = "YNTLCGJFcjCfTJOFtO5fvZI7ZNfZaFcrp42PUGAe3OA=";
    let token: String = encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(KEY_SECRET.as_ref()),
    )?;
    Ok(token)
}
pub fn decode_token(token: String) -> Result<Claims, errors::Error> {
    let KEY_SECRET: &str = "YNTLCGJFcjCfTJOFtO5fvZI7ZNfZaFcrp42PUGAe3OA=";
    let token: jsonwebtoken::TokenData<Claims> = decode::<Claims>(
        &token,
        &DecodingKey::from_secret(KEY_SECRET.as_ref()),
        &Validation::default(),
    )?;
    Ok(token.claims)
}
pub fn get_token_from_req(req: HttpRequest) -> Result<String, TypeDbError> {
    let auth_header = req
        .headers()
        .get("authorization")
        .ok_or_else(|| TypeDbError::new("Authorization header not found".to_string()))?;

    let auth_str = auth_header
        .to_str()
        .map_err(|_| TypeDbError::new("Invalid authorization header".to_string()))?;

    if auth_str.len() <= 6 {
        return Err(TypeDbError::new("Invalid authorization header".to_string()));
    }

    let token = &auth_str[7..];
    Ok(token.to_string())
}
