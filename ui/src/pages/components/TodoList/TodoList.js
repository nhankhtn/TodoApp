import classNames from "classnames/bind";

import styles from "./TodoList.module.scss";
import TodoItem from "./TodoItem";
import { useStore } from "~/store";

const cx = classNames.bind(styles);


function TodoList({ className }) {
    const [state, dispatch] = useStore();

    return (<div className={cx("wrapper")}>
        <div className={cx("heading")}>
            <span className={cx("title")}>Title</span>
            <span className={cx("desc")}>Description</span>
        </div>
        <div className={cx("wrapper-items")}>
            {state.todos.map(todo => <TodoItem className={className} key={todo.id} title={todo.title} description={todo.description} />)}
        </div>
    </div>);
}

export default TodoList;