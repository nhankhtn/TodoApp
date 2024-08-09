import classNames from "classnames/bind";
import Tippy from "@tippyjs/react/headless";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { faSpinner, faUser } from "@fortawesome/free-solid-svg-icons";

import styles from "./Sidebar.module.scss";
import FormAddTodo from "../../../components/FormAddTodo";
import Button from "../../../components/Button";
import { actions, useStore } from "~/store";
import Menu from "~/components/Menu";
import { useLoadProfile } from "~/hooks/useLoadProfile";
import images from "~/assets/images";


const cx = classNames.bind(styles);

function Sidebar() {
    const [state, dispatch] = useStore();
    const { theme } = state;
    const { isLoading } = useLoadProfile();
    const inputRef = useRef(null);

    const handleLogout = () => {
        dispatch(actions.deleteProfileUser());
        localStorage.removeItem("token-auth_x-todo");
    }

    const handleClickUpload = () => {
        if (!inputRef.current) return;
        inputRef.current.click();
    }

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        const form = new FormData();

        form.append("file", file);

        const resp = await fetch(`http://127.0.0.1:8080/api/user/${state.user.id}/upload/avatar`, {
            method: "PATCH",
            body: form
        });
        const result = await resp.json();
        dispatch(actions.updateAvatar({
            user_id: state.user.id,
            avatar: result.avatar
        }))
    }

    const items = [
        {
            title: "Upload avatar",
            action: handleClickUpload
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
                    <span className={cx("username")}>{state.user.username}</span>
                    <Tippy
                        render={showMenu}
                        interactive
                        trigger="click"
                        appendTo="parent"
                        offset={[40, 10]}
                    >
                        <div>
                            <button type="button" title="Settings" className={cx("avatar-user")}>
                                {state.user.avatar ? <img src={state.user.avatar} alt="Not found" /> :
                                    <FontAwesomeIcon icon={faUser} />}
                            </button>
                            <input type="file" ref={inputRef} onChange={handleUpload} accept="image/*" id="input-upload-avatar" className={cx("input-upload")} />
                        </div>
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