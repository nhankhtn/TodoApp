import classNames from "classnames/bind";

import styles from "./Sidebar.module.scss";
import FormAddTodo from "../../../components/FormAddTodo";
import Button from "../../../components/Button";
import { actions, useStore } from "~/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HumanIcon } from "~/components/Icons";
import { faSpinner, faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { get } from "~/utils";

const cx = classNames.bind(styles);

function Sidebar({ todos, setTodos }) {
    const [state, dispatch] = useStore();
    const { theme } = state;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let timeoutId;
        const loadProfile = async () => {
            try {
                const resp = await get('user/auth');
                timeoutId = setTimeout(() => setIsLoading(false), 1000);
                if (!resp.ok) {
                    console.log(resp);
                    return;
                }

                const user = resp.result;
                dispatch(actions.setProfileUser(user));
            } catch (err) {
                console.log(err);
            }
        }
        loadProfile();

        return clearTimeout(timeoutId);
    }, [])

    return (<aside className={cx("wrapper")}>
        <FormAddTodo
            className={{ dark: theme.isDarkMode }}
            todos={todos}
            setTodos={setTodos}
            isAuthenticated={state.user !== null}
        />
        <div className={cx("wrapper-account")}>
            {state.user && !isLoading ?
                <div className={cx("info")}>
                    {/* <Button className={classNames({ dark: theme.isDarkMode })} title="Log out">
                        Log out
                    </Button> */}
                    <span className={cx("username")}>Duy Nhan</span>
                    <button type="button" className={cx("avatar-user")}>
                        <FontAwesomeIcon icon={faUser} />
                    </button>
                </div>
                :
                <>
                    {isLoading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
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