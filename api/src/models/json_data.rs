use serde::{ Deserialize, Serialize };

#[derive(Serialize)]
pub struct JsonApiResponse<T>{
   pub data: T,
   pub metadata: Option<Meta>
}


#[derive(Serialize)]
pub struct Meta { 
    pub total: usize, 
    pub limit: usize
}

#[derive(Deserialize)]
pub  struct PaginationParams {
    pub limit: Option<usize>,
    pub offset: Option<usize>
}