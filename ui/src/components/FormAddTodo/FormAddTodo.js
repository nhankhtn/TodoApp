import classNames from "classnames/bind";

import styles from "./FormAddTodo.module.scss";
import Button from "../Button";
import { useFormInput } from "~/hooks/useFormInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useAddTodo } from "~/hooks/useAddTodo";

const cx = classNames.bind(styles);


function FormAddTodo({ isAuthenticated, className }) {
    const titleInput = useFormInput("");
    const descInput = useFormInput("");
    const { isLoading, error, addTodo } = useAddTodo();

    const handleAddTodo = async (e) => {
        e.preventDefault();
        addTodo(titleInput.props.value.trim(), descInput.props.value.trim(), isAuthenticated);
        titleInput.setValue('');
        descInput.setValue('');
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
        {isLoading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
    </form>);
}

export default FormAddTodo;