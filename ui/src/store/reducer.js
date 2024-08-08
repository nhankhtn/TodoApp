import { ADD_TODO, LOAD_TODOS, LOG_IN, LOG_OUT, SET_THEME } from "~/constants";

const initState = {
    theme: { isDarkMode: false },
    user: null,
    todos: []
}

function reducer(state, action) {
    switch (action.type) {
        case SET_THEME:
            return {
                ...state,
                theme: action.payload
            }
        case LOG_IN:
            return {
                ...state,
                user: action.payload
            }
        case LOG_OUT:
            return {
                ...state,
                user: null
            }
        case ADD_TODO:
            return {
                ...state,
                todos: [
                    ...state.todos,
                    action.payload
                ]
            }
        case LOAD_TODOS:
            return {
                ...state,
                todos: [
                    ...action.payload
                ]
            }
        default:
            return state;
    }
}

export { initState };
export default reducer;