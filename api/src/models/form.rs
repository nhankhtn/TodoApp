use actix_multipart::form::{tempfile::TempFile, MultipartForm};

#[derive(MultipartForm)]
pub struct UploadAvatar {
    pub file: TempFile,
}
