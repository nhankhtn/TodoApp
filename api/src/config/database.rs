use sqlx::MySqlPool;

pub async fn connect_database() -> Result<MySqlPool, sqlx::Error> {
    MySqlPool::connect("mysql://root:Duynhan101220@4@localhost:3306/todo_app").await
}
