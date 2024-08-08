import { useEffect } from "react";
import { actions, useStore } from "~/store";
import { get } from "~/utils";


export function useLoadTodos() {
    const [state, dispatch] = useStore();

    useEffect(() => {
        try {
            const loadTodos = async () => {
                const resp = await get(`todo/all/${state.user?.id || 0}`);
                if (!resp.ok) {
                    console.log(resp);
                    return;
                }
                const todos = resp.result.data;
                dispatch(actions.loadTodos(todos))
            }
            loadTodos();
        } catch (error) {
            console.log(error);
        }
    }, [dispatch, state.user])
}