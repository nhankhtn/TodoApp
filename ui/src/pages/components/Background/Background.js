import classNames from "classnames/bind";

import styles from "./Background.module.scss";
import { DarkIcon, LightIcon } from "~/components/Icons";
import { actions, useStore } from "~/store";

const cx = classNames.bind(styles);


function Background() {
    const [state, dispatch] = useStore();
    const { theme } = state;

    return (
        <div className={cx("background", {
            dark: theme.isDarkMode
        })}>
            <h1 className={cx("brand")}>T O D O L I S T</h1>
            <button
                type="button"
                title="Change theme"
                className={cx("theme-btn")}
                onClick={e => dispatch(actions.setTheme(!theme.isDarkMode))}
            >
                {theme.isDarkMode ?
                    <LightIcon className={cx("theme-icon")} /> :
                    <DarkIcon className={cx("theme-icon")} />}
            </button>
        </div>
    );
}

export default Background;