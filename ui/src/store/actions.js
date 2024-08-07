
import { ADD_TODO, LOAD_TODOS, DELETE_TODO, LOG_IN, LOG_OUT, SET_THEME, UPDATE_TODO, UPDATE_AVATAR_USER } from "~/constants";

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
    type: LOG_OUT
})
export const updateAvatar = payload => ({
    type: UPDATE_AVATAR_USER,
    payload
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
export const updateTodo = payload => ({
    type: UPDATE_TODO,
    payload
})