import classNames from "classnames/bind";

import styles from "./TodoItem.module.scss";
import { CancelIcon, RadioCheckedIcon, RadioIcon } from "~/components/Icons";
import { _delete, patch } from "~/utils";
import { actions, useStore } from "~/store";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function TodoItem({ todo, editingTodoId, setEditingTodoId, className }) {
    const [state, dispatch] = useStore();
    const [title, setTitle] = useState(todo.title);
    const [desc, setDesc] = useState(todo.description);
    const [fieldEditing, setFieldEditing] = useState(null);

    const isEditing = editingTodoId === todo.id;

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
            if (title.trim() !== todo.title || desc.trim() !== todo.description) {
                const value = fieldEditing === 'title' ? title.trim() : desc.trim();

                await patch(`todo/${todo.user_id}/${todo.id}/${fieldEditing}/update`, { value });
                dispatch(actions.updateTodo({
                    user_id: todo.user_id,
                    id: todo.id,
                    fieldEditing,
                    value
                }))
            }
        } catch (err) {
            console.log(err);
        } finally {
            setEditingTodoId(null);
            setFieldEditing(null);
        }
    }

    return (
        <div className={cx("wrapper-item")}>
            <button type="button" title="Check" className={cx("btn-check", className)} onClick={markComplete}>
                {!todo.is_completed ? <RadioIcon /> : <RadioCheckedIcon />}
            </button>
            <span onDoubleClick={e => { setEditingTodoId(todo.id); setFieldEditing('title') }} className={cx("heading", {
                completed: todo.is_completed
            })}>
                {
                    isEditing && fieldEditing === 'title' ?
                        <>
                            <input onChange={e => setTitle(e.target.value)} value={title} className={cx("input-edit", className)} />
                            <button type="button" onClick={handleUpdateTodo} className={cx("btn-tick")}><FontAwesomeIcon icon={faCheck} /></button>
                        </> :
                        <>{todo.title}</>
                }
            </span>
            <p onDoubleClick={e => { setEditingTodoId(todo.id); setFieldEditing('desc') }} className={cx("desc", {
                completed: todo.is_completed
            })}>
                {
                    isEditing && fieldEditing === 'desc' ?
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