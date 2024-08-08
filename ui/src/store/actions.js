import { ADD_TODO, LOAD_TODOS, DELETE_TODO, LOG_IN, LOG_OUT, MARK_COMPLETED, MARK_UNCOMPLETED, SET_THEME } from "~/constants";

export const setTheme = payload => {
    localStorage.setItem('theme_x-todo', JSON.stringify(payload));
    return {
        type: SET_THEME,
        payload
    };
}

export const setProfileUser = payload => ({
    type: LOG_IN,
    payload
})

export const deleteProfileUser = () => ({
    type: LOG_OUT,
    payload: null
})
export const addTodo = payload => ({
    type: ADD_TODO,
    payload
})
export const loadTodos = payload => ({
    type: LOAD_TODOS,
    payload
})
export const deleteTodo = payload => ({
    type: DELETE_TODO,
    payload
})
export const markCompleted = payload => ({
    type: MARK_COMPLETED,
    payload
})
export const markUncompleted = payload => ({
    type: MARK_UNCOMPLETED,
    payload
})