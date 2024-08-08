import classNames from "classnames/bind";

import styles from "./FormAddTodo.module.scss";
import Button from "../Button";
import { useFormInput } from "~/hooks/useFormInput";
import { useState } from "react";
import { MAX_FREE_TODOS } from "~/constants";
import { actions, useStore } from "~/store";

const cx = classNames.bind(styles);


function FormAddTodo({ isAuthenticated, className }) {
    const titleInput = useFormInput("");
    const descInput = useFormInput("");
    const [error, setError] = useState('');
    const [state, dispatch] = useStore();

    const handleAddTodo = (e) => {
        e.preventDefault();
        if (!titleInput.props.value) {
            setError("The title field cannot be empty!");
            return;
        }
        if (state.todos.length === MAX_FREE_TODOS && !isAuthenticated) {
            setError(`You need log in to add more than ${MAX_FREE_TODOS} todos!`);
            return;
        }

        const newTodo = {
            id: state.todos[state.todos.length - 1].id + 1,
            title: titleInput.props.value,
            description: descInput.props.value,
            isCompleted: false,
            createdAt: new Date().toLocaleString()
        };
        dispatch(actions.addTodo(newTodo))
        titleInput.setValue('');
        descInput.setValue('');
        setError('');

    }

    return (<form className={cx("wrapper", className)}>
        <h3 className={cx("heading")}>Add a todo</h3>
        <div className={cx("form-item")}>
            <label htmlFor="title">Title</label>
            <input name="title" id="title" {...titleInput.props} />
        </div>
        <div className={cx("form-item")}>
            <label htmlFor="description">Description</label>
            <input name="description" id="description" {...descInput.props} />
        </div>
        {error && <span className={cx("message-error")}>{error}</span>}
        <Button type="submit" title="Add todo" className={cx("btn-submit")} onClick={handleAddTodo}>
            Add to list
        </Button>
    </form>);
}

export default FormAddTodo;