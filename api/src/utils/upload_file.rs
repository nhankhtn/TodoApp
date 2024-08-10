use std::path::{self, Path, PathBuf};

use crate::{get_url_api_images_from_env, models::UploadAvatar, utils::TypeDbError};

pub fn get_unique_file_path(path: &Path) -> PathBuf {
    let mut new_path = path.to_path_buf();
    let path = path.to_path_buf();
    let mut count = 1;
    let extension = path
        .extension()
        .and_then(|ext| ext.to_str())
        .unwrap_or_default();
    let file_stem = path
        .file_stem()
        .and_then(|stem| stem.to_str())
        .unwrap_or_default();

    while new_path.exists() {
        let new_file_name = format!("{}({}).{}", file_stem, count, extension);
        new_path.set_file_name(new_file_name);
        count += 1;
    }

    new_path
}
pub fn upload_file(form: UploadAvatar) -> Result<String, TypeDbError> {
    let url_api_images: String = get_url_api_images_from_env();
    let f = form.file;
    let origin_file_name = f
        .file_name
        .ok_or(TypeDbError::new("There is error when upload".to_string()))?;
    let file_path = path::Path::new("./uploads").join(&origin_file_name);
    let unique_file_path = get_unique_file_path(&file_path);

    log::info!("saving to {:?}", unique_file_path);
    f.file
        .persist(&unique_file_path)
        .map_err(|e| TypeDbError::new(e.to_string()))?;

    if let Some(file_name) = unique_file_path.file_name() {
        if let Some(name) = file_name.to_str() {
            println!("Tên file: {}", name);
            let path = format!("{}/{}", url_api_images, name);
            Ok(path)
        } else {
            Err(TypeDbError::new(
                "Can't convert file name to string".to_string(),
            ))
        }
    } else {
        Err(TypeDbError::new("Can't find file name".to_string()))
    }
}
