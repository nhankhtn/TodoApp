# TodoApp

TodoApp is written by ReactJS + Rust with framework Actix-web, and I used MySQL database to store todo of users

# Functions

- Register and login
- CRUD tasks
- Mark completed
- List tasks
- Remind and notify
- Create a category
- Search and filter
- Calendar integration

# Front end

# Back end

Base url: http://127.0.0.1:8080/api
Route: /user
/all : return all user
/register : add information of user into database and return token id to client
/login : check info of user in database and return token id to client
/auth : check token and return info of user
/{id}/delete : delete user
/{field}/update : update user
/upload/avatar : upload avatar of user

Route: /todo
/all/{user_id} : return all todos of user (user_id)
/create/{user_id} : create todo and return all fields of todo just created
/{user_id}/{id}/delete : delete todo  
/{field}/update/{user_id}/{id} : update todo

Api response
{
data: T
metadata: Option<Meta>
}
Meta
{
total: usize,
limit: usize
}
