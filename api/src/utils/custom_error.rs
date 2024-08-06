use crate::helpers::string;
use serde::Serialize;
use std::fmt;

#[derive(Serialize)]
pub enum TypeDbError {
    DuplicateEmail,
    Error(String),
}

impl TypeDbError {
    pub fn new(error: String) -> TypeDbError {
        if string::contains_case_insensitive(&error.to_string(), "Duplicate entry") {
            TypeDbError::DuplicateEmail
        } else {
            TypeDbError::Error(error)
        }
    }
}

pub struct MessageError {
    pub message: &'static str,
}

impl MessageError {
    pub const PASSWORD_WRONG: MessageError = MessageError {
        message: "Invalid password",
    };
    pub const EMAIL_WRONG: MessageError = MessageError {
        message: "Invalid email",
    };
}
impl fmt::Display for MessageError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.message)
    }
}
