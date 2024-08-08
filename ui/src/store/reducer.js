import { ADD_TODO, LOG_IN, LOG_OUT, SET_THEME } from "~/constants";

const initState = {
    theme: { isDarkMode: false },
    user: null,
    todos: [
        {
            id: 1,
            title: "Ăn sáng",
            description: "Ăn bánh mì",
            isCompleted: false,
            createdAt: "18h30 12/2/2024"
        },
        {
            id: 2,
            title: "Ăn trưa",
            description: "Ăn cơm gà",
            isCompleted: false,
            createdAt: "18h30 12/2/2024"
        },
        {
            id: 3,
            title: "Ăn chiều",
            description: "Ăn chè",
            isCompleted: false,
            createdAt: "18h30 12/2/2024"
        },
        {
            id: 4,
            title: "Ăn tối",
            description: "Ăn mì",
            isCompleted: false,
            createdAt: "18h30 12/2/2024"
        }
    ]
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
        default:
            return state;
    }
}

export { initState };
export default reducer;