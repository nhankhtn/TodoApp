use std::path::{self, Path, PathBuf};

use crate::{models::UploadAvatar, utils::TypeDbError};

pub fn get_unique_file_path(path: &Path) -> PathBuf {
    let mut new_path = path.to_path_buf();
    let mut count = 1;

    while new_path.exists() {
        let extension = new_path
            .extension()
            .unwrap_or_default()
            .to_str()
            .unwrap_or_default();
        let file_stem = new_path
            .file_stem()
            .unwrap_or_default()
            .to_str()
            .unwrap_or_default();
        let new_file_name = format!("{}({}).{}", file_stem, count, extension);
        new_path.set_file_name(new_file_name);
        count += 1;
    }
    new_path
}
pub fn upload_file(form: UploadAvatar) -> Result<String, TypeDbError> {
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

    let path: String = unique_file_path
        .to_str()
        .ok_or(TypeDbError::new(
            "There is error when get name file".to_string(),
        ))?
        .to_string();
    Ok(path)
}
