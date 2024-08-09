import classNames from "classnames/bind";

import styles from "./Header.module.scss";
import { useStore } from "~/store";
import { useEffect } from "react";

const cx = classNames.bind(styles);

function Header() {
    const [state, dispatch] = useStore();
    const { theme } = state;

    const countTodosCompleted = state.todos.filter(todo => todo.is_completed).length;
    const todoTotal = state.todos.length;

    return (<header className={cx("wrapper", {
        dark: theme.isDarkMode
    })}>
        {countTodosCompleted}/{todoTotal} todos completed
    </header>);
}

export default Header;