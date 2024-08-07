import { LOG_IN, SET_THEME } from "~/constants";

const initState = {
    theme: { isDarkMode: false },
    user: null
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
        default:
            return state;
    }
}

export { initState };
export default reducer;