import { LOG_IN, LOG_OUT, SET_THEME } from "~/constants";

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

export const deleteProfileUser = payload => ({
    type: LOG_OUT,
    payload
})