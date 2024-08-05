import classNames from "classnames/bind";

import styles from "./FormAddTodo.module.scss";
import Button from "../Button";

const cx = classNames.bind(styles);


function FormAddTodo() {
    return (<form className={cx("wrapper")}>
        <h3 className={cx("heading")}>Add a todo</h3>
        <div className={cx("form-item")}>
            <label htmlFor="title">Title</label>
            <input name="title" id="title" />
        </div>
        <div className={cx("form-item")}>
            <label htmlFor="description">Description</label>
            <input name="description" id="description" />
        </div>
        <Button type="submit" className={cx("btn-submit")} title="Add todo">
            Add to list
        </Button>
    </form>);
}

export default FormAddTodo;