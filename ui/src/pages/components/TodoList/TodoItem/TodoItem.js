import classNames from "classnames/bind";

import styles from "./TodoItem.module.scss";
import { CancelIcon, RadioCheckedIcon, RadioIcon } from "~/components/Icons";
import { _delete, patch } from "~/utils";
import { actions, useStore } from "~/store";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function TodoItem({ todo, className }) {
    const [state, dispatch] = useStore();
    const [showEditTitle, setShowEditTitle] = useState(false);
    const [title, setTitle] = useState(todo.title);
    const [showEditDesc, setShowEditDesc] = useState(false);
    const [desc, setDesc] = useState(todo.description);

    const time = new Date(todo.created_at);
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
            await patch(`todo/${todo.user_id}/${todo.id}/is_completed/update`, {
                value: !todo.is_completed ? "1" : "0"
            });
            dispatch(actions.updateTodo({
                user_id: todo.user_id,
                id: todo.id,
                fieldUpdated: "is_completed",
                value: !todo.is_completed
            }))
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdateTodo = async () => {
        try {
            if ((!showEditTitle || title !== todo.trim().title) && (!showEditDesc || desc.trim() !== todo.description)) {
                const fieldUpdated = showEditTitle ? "title" : "description";
                const value = showEditTitle ? title.trim() : desc.trim();

                await patch(`todo/${todo.user_id}/${todo.id}/${fieldUpdated}/update`, { value });
                dispatch(actions.updateTodo({
                    user_id: todo.user_id,
                    id: todo.id,
                    fieldUpdated,
                    value
                }))
            }
        } catch (err) {
            console.log(err);
        } finally {
            setShowEditTitle(false);
            setShowEditDesc(false);
        }
    }


    return (
        <div className={cx("wrapper-item")}>
            <button type="button" title="Check" className={cx("btn-check", className)} onClick={markComplete}>
                {!todo.is_completed ? <RadioIcon /> : <RadioCheckedIcon />}
            </button>
            <span onDoubleClick={e => { setShowEditTitle(true); setShowEditDesc(false) }} className={cx("heading", {
                completed: todo.is_completed
            })}>
                {showEditTitle ?
                    <>
                        <input onChange={e => setTitle(e.target.value)} value={title} className={cx("input-edit", className)} />
                        <button type="button" onClick={handleUpdateTodo} className={cx("btn-tick")}><FontAwesomeIcon icon={faCheck} /></button>
                    </> :
                    <>{todo.title}</>
                }
            </span>
            <p onDoubleClick={e => { setShowEditDesc(true); setShowEditTitle(false) }} className={cx("desc", {
                completed: todo.is_completed
            })}>
                {
                    showEditDesc ?
                        <>
                            <input onChange={e => setDesc(e.target.value)} value={desc} className={cx("input-edit", className)} />
                            <button type="button" onClick={handleUpdateTodo} className={cx("btn-tick")}><FontAwesomeIcon icon={faCheck} /></button>
                        </> :
                        <>{desc}</>
                }
            </p>
            <div className={cx("end-item")}>
                <button type="button" title="Cancel" onClick={handleDeleteTodo} className={cx("btn-delete-item", className)}>
                    <CancelIcon />
                </button>
                <span className={cx("date")}>{date}</span>
            </div>
        </div>
    );
}

export default TodoItem;