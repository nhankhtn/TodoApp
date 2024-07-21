use sqlx::MySqlPool;

pub async fn connect_database(url: String) -> Result<MySqlPool, sqlx::Error> {
    MySqlPool::connect(&url).await
}
