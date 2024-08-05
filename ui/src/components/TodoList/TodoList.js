import classNames from "classnames/bind";

import styles from "./TodoList.module.scss";
import TodoItem from "./TodoItem";

const cx = classNames.bind(styles);

const todos = [
    {
        id: 1,
        title: "Ăn sáng",
        description: "Ăn bánh mì",
        isCompleted: false,
        createdAt: "18h30 12/2/2024"
    },
    {
        id: 2,
        title: "Ăn trưa",
        description: "Ăn cơm gà",
        isCompleted: false,
        createdAt: "18h30 12/2/2024"
    },
    {
        id: 3,
        title: "Ăn chiều",
        description: "Ăn chè",
        isCompleted: false,
        createdAt: "18h30 12/2/2024"
    },
    {
        id: 4,
        title: "Ăn tối",
        description: "Ăn mì",
        isCompleted: false,
        createdAt: "18h30 12/2/2024"
    }
]

function TodoList() {
    return (<div className={cx("wrapper")}>
        <div className={cx("heading")}>
            <span className={cx("title")}>Title</span>
            <span className={cx("desc")}>Description</span>
        </div>
        <div className={cx("wrapper-items")}>
            {todos.map(todo => <TodoItem key={todo.id} title={todo.title} description={todo.description} />)}
            {todos.map(todo => <TodoItem key={todo.id} title={todo.title} description={todo.description} />)}
            {todos.map(todo => <TodoItem key={todo.id} title={todo.title} description={todo.description} />)}
            {todos.map(todo => <TodoItem key={todo.id} title={todo.title} description={todo.description} />)}
        </div>
    </div>);
}

export default TodoList;