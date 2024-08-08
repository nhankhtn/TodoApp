import { ADD_TODO, DELETE_TODO, LOAD_TODOS, LOG_IN, LOG_OUT, MARK_COMPLETED, SET_THEME } from "~/constants";

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
        case DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.user_id !== action.payload.user_id || todo.id !== action.payload.id)
            }
        case MARK_COMPLETED:
            return {
                ...state,
                todos: state.todos.map(todo => (
                    todo.user_id === action.payload.user_id && todo.id === action.payload.id ?
                        {
                            ...todo,
                            is_completed: action.payload.is_completed
                        }
                        :
                        todo
                ))
            }
        default:
            return state;
    }
}

export { initState };
export default reducer;