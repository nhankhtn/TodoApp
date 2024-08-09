use std::path::PathBuf;

use actix_files::NamedFile;
use actix_web::{web, Responder, Result};

pub async fn serve_image(path: web::Path<String>) -> Result<impl Responder> {
    let filename = path.into_inner();
    let image_path: PathBuf = format!("./uploads/{}", filename).into();
    Ok(NamedFile::open(image_path)?)
}
