import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import styles from "./FormLogin.module.scss";
import Button from "../Button";
import { useFormInput } from "~/hooks/useFormInput";
import { useLogin } from "~/hooks/useLogin";


const cx = classNames.bind(styles);


function FormLogin({ className }) {
    const emailInput = useFormInput('');
    const passwordInput = useFormInput('');
    const [showPassword, setShowPassword] = useState(false);
    const { handleLogin, isLoading, error } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleLogin(emailInput.props.value.trim(), passwordInput.props.value.trim());
    }

    return (<form className={cx("wrapper", className)}>
        <h3 className={cx("heading")}>LOG IN</h3>
        <div className={cx("form-item")}>
            <label htmlFor="email">Email</label>
            <input name="email" id="email" type="text" {...emailInput.props} placeholder="example@gmail.com" />
        </div>
        <div className={cx("form-item")}>
            <label htmlFor="password">Password</label>
            <div className={cx("password-wrapper")}>
                <input name="password" id="password" type={showPassword ? "text" : "password"} {...passwordInput.props} />
                <button
                    type="button"
                    className={cx("toggle-password")}
                    onClick={e => setShowPassword(!showPassword)}
                >
                    {showPassword ? <span >&#128586;</span> :
                        <span >&#128065;</span>}
                </button>
            </div>
        </div>
        {error && <span className={cx("message-error")}>{error}</span>}
        <Button type="submit" title="Log in" className={classNames(cx("btn-submit"), className)} onClick={handleSubmit}>
            Log in
        </Button>
        {isLoading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
    </form>);
}

export default FormLogin;