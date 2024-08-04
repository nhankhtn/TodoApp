use serde::Serialize;
use crate::helpers::string;

#[derive(Serialize)]
pub enum TypeDbError {
    DuplicateEmail,
    Other(String)
}

impl TypeDbError {
    pub fn new(error: String) -> TypeDbError {
        if string::contains_case_insensitive(&error.to_string(), "Duplicate entry") {
            TypeDbError::DuplicateEmail
        }else {
            TypeDbError::Other(error)
        }
    }
}
