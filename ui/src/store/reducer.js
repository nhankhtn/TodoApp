import { SET_THEME } from "~/constants";

const initState = {
    theme: { isDarkMode: false },
    user: null
}

function reducer(state, action) {
    switch (action.type) {
        case SET_THEME:
            return {
                ...state,
                theme: {
                    isDarkMode: action.payload
                }
            }
        default:
            return state;
    }
}

export { initState };
export default reducer;