import classNames from "classnames/bind";
import { useState } from "react";

import styles from "./Sidebar.module.scss";
import FormAddTodo from "../../../components/FormAddTodo";
import Button from "../../../components/Button";
import { useStore } from "~/store";

const cx = classNames.bind(styles);

function Sidebar({ todos, setTodos }) {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [state, dispatch] = useStore();
    const { theme } = state;

    return (<aside className={cx("wrapper")}>
        <FormAddTodo
            className={{ dark: theme.isDarkMode }}
            todos={todos}
            setTodos={setTodos}
            isAuthenticated={isAuthenticated}
        />
        <div className={cx("wrapper-account")}>
            {isAuthenticated ?
                <Button className={classNames({ dark: theme.isDarkMode })} title="Log out">
                    Log out
                </Button> :
                <>
                    <Button className={classNames({ dark: theme.isDarkMode })} title="Login" to={'/login'}>
                        Login
                    </Button>
                    <Button className={classNames({ dark: theme.isDarkMode })} title="Register" to={'/register'}>
                        Register
                    </Button>
                </>}
        </div>
    </aside >);
}

export default Sidebar;