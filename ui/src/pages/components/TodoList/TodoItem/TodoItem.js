import classNames from "classnames/bind";

import styles from "./TodoItem.module.scss";
import { CancelIcon, RadioCheckedIcon, RadioIcon } from "~/components/Icons";
import { _delete, patch } from "~/utils";
import { actions, useStore } from "~/store";

const cx = classNames.bind(styles);

function TodoItem({ todo, className }) {
    const [state, dispatch] = useStore();
    const time = new Date(todo.created_at);
    // const hours = `${time.getHours()}h${time.getMinutes()}`;
    const date = `${time.getDate()}/${time.getMonth()}/${time.getFullYear()}`;

    const handleDeleteTodo = async () => {
        try {
            const resp = await _delete(`todo/${todo.user_id}/${todo.id}/delete`);
            dispatch(actions.deleteTodo({
                user_id: todo.user_id,
                id: todo.id
            }))
        } catch (err) {
            console.log(err);
        }
    }
    const markComplete = async () => {
        try {
            const resp = await patch(`todo/${todo.user_id}/${todo.id}/is_completed/update`, {
                value: !todo.is_completed ? "1" : "0"
            });
            dispatch(actions.markCompleted({
                user_id: todo.user_id,
                id: todo.id,
                is_completed: !todo.is_completed
            }))
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={cx("wrapper-item")}>
            <div className={cx("main-info")}>
                <button type="button" title="Check" className={cx("btn-check", className)} onClick={markComplete}>
                    {!todo.is_completed ? <RadioIcon /> : <RadioCheckedIcon />}
                </button>
                <span className={cx("heading", {
                    completed: todo.is_completed
                })}>{todo.title}</span>
                <p className={cx("desc", {
                    completed: todo.is_completed
                })}>{todo.description}</p>
                <button type="button" title="Cancel" onClick={handleDeleteTodo} className={cx("btn-delete-item", className)}>
                    <CancelIcon />
                </button>
            </div>
            <div className={cx("sub-info")}>
                {/* <span className={cx("time")}>{hours}</span> */}
                <span className={cx("date")}>{date}</span>
            </div>
        </div>
    );
}

export default TodoItem;