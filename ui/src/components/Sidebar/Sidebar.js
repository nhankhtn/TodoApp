import classNames from "classnames/bind";

import styles from "./Sidebar.module.scss";
import FormAddTodo from "../FormAddTodo";
import Button from "../Button";

const cx = classNames.bind(styles);

function Sidebar() {
    return (<aside className={cx("wrapper")}>
        <FormAddTodo />
        <div className={cx("wrapper-account")}>
            <Button title="Login">
                Login
            </Button>
            <Button title="Register">
                Register
            </Button>
        </div>
    </aside>);
}

export default Sidebar;