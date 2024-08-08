import classNames from "classnames/bind";

import styles from "./TodoList.module.scss";
import TodoItem from "./TodoItem";
import { useStore } from "~/store";
import { useLoadTodos } from "~/hooks/useLoadTodos";

const cx = classNames.bind(styles);


function TodoList({ className }) {
    const [state, dispatch] = useStore();
    useLoadTodos();

    return (<div className={cx("wrapper")}>
        <div className={cx("heading")}>
            <span className={cx("title")}>Title</span>
            <span className={cx("desc")}>Description</span>
        </div>
        <div className={cx("wrapper-items")}>
            {state.todos.map(todo => <TodoItem className={className} key={todo.id} todo={todo} />)}
        </div>
    </div>);
}

export default TodoList;