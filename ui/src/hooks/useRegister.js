import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isValidEmail, post } from "~/utils";


export function useRegister() {
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (email, username, password) => {
        if (!email || !username || !password) {
            setError("Please fill in all fields!");
            return;
        }
        if (!isValidEmail(email)) {
            setError("Email is invalid!");
            return;
        }
        if (password.length < 6) {
            setError("Password is too short!");
            return;
        }
        setLoading(true);

        try {
            const resp = await post("user/register", {
                username,
                email,
                password
            });
            setLoading(false);
            if (!resp.ok) {
                setError(resp.result);
                return;
            }
            const token = resp.result.token;
            localStorage.setItem("token-auth_x-todo", token);
            setError('');
            navigate('/');
        } catch (err) {
            setError("Error! Please try again later.");
            setLoading(false);
        }
    }
    return {
        handleRegister,
        isLoading,
        error,
    };
}