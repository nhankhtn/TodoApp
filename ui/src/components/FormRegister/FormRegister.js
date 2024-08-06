import classNames from "classnames/bind";

import styles from "./FormRegister.module.scss";
import Button from "../Button";
import { useFormInput } from "~/hooks/useFormInput";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { isValidEmail, post } from "~/utils";
import { useNavigate } from "react-router-dom";


const cx = classNames.bind(styles);


function FormRegister({ className }) {
    const emailInput = useFormInput('');
    const usernameInput = useFormInput('');
    const passwordInput = useFormInput('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!emailInput.props.value || !usernameInput.props.value || !passwordInput.props.value) {
            setError("Please fill in all fields!");
            return;
        }
        if (!isValidEmail(emailInput.props.value)) {
            setError("Email is invalid!");
            return;
        }
        if (passwordInput.props.value.trim().length < 6) {
            setError("Password is too short!");
            return;
        }
        setLoading(true);

        const resp = await post("user/register", {
            username: usernameInput.props.value.trim(),
            email: emailInput.props.value.trim(),
            password: passwordInput.props.value.trim()
        });
        setLoading(false);
        console.log(resp);
        if (!resp.ok) {
            setError(resp.result);
            return;
        }

        setError('');
        navigate('/');
    }

    return (<form className={cx("wrapper", className)}>
        <h3 className={cx("heading")}>REGISTER</h3>
        <div className={cx("form-item")}>
            <label htmlFor="email">Email</label>
            <input name="email" id="email" type="text" {...emailInput.props} />
        </div>
        <div className={cx("form-item")}>
            <label htmlFor="username">Username</label>
            <input name="username" id="username" type="text" {...usernameInput.props} />
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
        <Button type="submit" title="Log in" className={cx("btn-submit")} onClick={handleSubmit}>
            Register
        </Button>
        {isLoading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
    </form>);
}

export default FormRegister;