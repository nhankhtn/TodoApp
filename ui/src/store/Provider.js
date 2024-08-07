import { useLayoutEffect, useReducer } from "react";
import Context from "./Context";
import reducer, { initState } from "./reducer";
import { actions } from ".";

function Provider({ children }) {
    const [state, dispatch] = useReducer(reducer, initState);

    useLayoutEffect(() => {
        const storedTheme = JSON.parse(localStorage.getItem('theme_x-todo'));
        if (storedTheme) {
            dispatch(actions.setTheme(storedTheme));
        }
    }, []);

    // useLayoutEffect(() => {
    //     localStorage.setItem('theme_x-todo', JSON.stringify(state.theme));
    // }, [state.theme]);

    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
}

export default Provider;


