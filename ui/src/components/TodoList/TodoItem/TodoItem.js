import classNames from "classnames/bind";

import styles from "./TodoItem.module.scss";
import { CancelIcon, RadioCheckedIcon, RadioIcon } from "~/components/Icons";

const cx = classNames.bind(styles);

function TodoItem({ title, description, isCompleted = false }) {
    return (
        <div className={cx("wrapper-item")}>
            <button type="button" title="Check" className={cx("btn-check")}>
                {!isCompleted ? <RadioIcon /> : <RadioCheckedIcon />}
            </button>
            <span className={cx("heading", {
                completed: isCompleted
            })}>{title}</span>
            <p className={cx("desc", {
                completed: isCompleted
            })}>{description}</p>
            <button type="button" title="Cancel" className={cx("btn-delete-item")}>
                <CancelIcon />
            </button>
        </div>
    );
}

export default TodoItem;