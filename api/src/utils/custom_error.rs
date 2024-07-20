use serde::Serialize;

#[derive(Serialize)]
pub struct TypeDbError {
    pub error: String,
}

impl TypeDbError {
    pub fn new(error: String) -> TypeDbError {
        TypeDbError {
            error,
        }
    }
}
