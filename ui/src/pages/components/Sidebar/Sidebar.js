import classNames from "classnames/bind";
import Tippy from "@tippyjs/react/headless";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { faSpinner, faUser } from "@fortawesome/free-solid-svg-icons";

import styles from "./Sidebar.module.scss";
import FormAddTodo from "../../../components/FormAddTodo";
import Button from "../../../components/Button";
import { actions, useStore } from "~/store";
import { get } from "~/utils";
import Menu from "~/components/Menu";
import { useLoadProfile } from "~/hooks/useLoadProfile";


const cx = classNames.bind(styles);

function Sidebar() {
    const [state, dispatch] = useStore();
    const { theme } = state;
    const { isLoading } = useLoadProfile();

    const handleLogout = () => {
        dispatch(actions.deleteProfileUser());
        localStorage.removeItem("token-auth_x-todo");
    }

    const items = [
        {
            title: "Upload avatar",
            action: () => { console.log("Upload avatar"); }
        },
        {
            title: "Log out",
            action: handleLogout
        }
    ]

    const showMenu = (attrs) => (
        <div className="settings" tabIndex="-1" {...attrs}>
            <Menu items={items} className={{ dark: theme.isDarkMode }} />
        </div>
    )

    return (<aside className={cx("wrapper")}>
        <FormAddTodo
            className={{ dark: theme.isDarkMode }}
            isAuthenticated={state.user !== null}
        />
        <div className={cx("wrapper-account")}>
            {state.user && !isLoading ?
                <div className={cx("info")}>
                    {/* <Button className={classNames({ dark: theme.isDarkMode })} title="Log out">
                        Log out
                    </Button> */}
                    <span className={cx("username")}>{state.user.username}</span>
                    <Tippy
                        render={showMenu}
                        interactive
                        trigger="click"
                        appendTo="parent"
                        offset={[40, 10]}
                    >
                        <button type="button" title="Settings" className={cx("avatar-user")}>
                            <FontAwesomeIcon icon={faUser} />
                        </button>
                    </Tippy>
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