// hooks/useLogin.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isValidEmail, post } from '~/utils';

export function useLogin() {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (email, password) => {
        if (!email || !password) {
            setError("Please fill in all fields!");
            return;
        }
        if (!isValidEmail(email)) {
            setError("Email invalid!");
            return;
        }
        setLoading(true);

        try {
            const resp = await post("user/login", {
                email,
                password
            });

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
        } finally {
            setLoading(false);
        }
    };

    return {
        handleLogin,
        isLoading,
        error,
    };
}
