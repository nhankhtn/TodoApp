import classNames from "classnames/bind";

import styles from "./Header.module.scss";
import { useStore } from "~/store";

const cx = classNames.bind(styles);

function Header() {
    const [state, dispatch] = useStore();
    const { theme } = state;

    return (<header className={cx("wrapper", {
        dark: theme.isDarkMode
    })}>
        1/3 todos completed
    </header>);
}

export default Header;