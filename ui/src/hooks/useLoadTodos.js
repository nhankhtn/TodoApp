import { useEffect } from "react";
import { actions, useStore } from "~/store";
import { get } from "~/utils";


export function useLoadTodos() {
    const [state, dispatch] = useStore();

    useEffect(() => {
        const loadTodos = async () => {
            try {
                const resp = await get(`todo/all/${state.user?.id || 0}`);
                if (!resp.ok) {
                    console.log(resp);
                    return;
                }
                const todos = resp.result.data;
                dispatch(actions.loadTodos(todos))

            } catch (error) {
                console.log(error);
            }
        }
        loadTodos();

    }, [dispatch, state.user])
}