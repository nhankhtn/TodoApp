use chrono::{Duration, Utc};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Claims {
    pub sub: i32,
    pub exp: usize,
}

impl Claims {
    pub fn new(sub: i32, exp_duration: Duration) -> Self {
        let exp = (Utc::now() + exp_duration).timestamp() as usize;
        Claims { sub, exp }
    }
}
#[derive(Serialize)]
pub struct Token {
    pub token: String,
}
