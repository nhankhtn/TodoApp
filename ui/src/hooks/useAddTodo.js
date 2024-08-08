import { useState } from "react";
import { MAX_FREE_TODOS } from "~/constants";
import { actions, useStore } from "~/store";
import { post } from "~/utils";


export function useAddTodo() {
    const [error, setError] = useState('');
    const [state, dispatch] = useStore();
    const [isLoading, setIsLoading] = useState(false);

    const addTodo = async (title, desc = "", isAuthenticated) => {
        if (!title) {
            setError("The title field cannot be empty!");
            return;
        }
        if (state.todos.length === MAX_FREE_TODOS && !isAuthenticated) {
            setError(`You need log in to add more than ${MAX_FREE_TODOS} todos!`);
            return;
        }
        if (!isAuthenticated) {
            const newTodo = {
                id: state.todos[state.todos.length - 1]?.id + 1 || 1,
                title,
                description: desc,
                is_completed: false,
                created_at: Date.now()
            }
            dispatch(actions.addTodo(newTodo))
            setError('');
            return;
        }

        try {
            setIsLoading(true);
            const resp = await post(`todo/create/${state.user.id}`, {
                title,
                description: desc,
            });
            if (!resp.ok) {
                console.log("Error server: ", resp);
            }
            dispatch(actions.addTodo(resp.result.data))
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
            setError('');
        }
    }
    return {
        isLoading, error, addTodo
    }
}