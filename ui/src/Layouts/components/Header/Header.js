import classNames from "classnames/bind";

import styles from "./Header.module.scss";
const cx = classNames.bind(styles);

function Header() {
    return (<div className={cx("wrapper")}>
        <div className={cx("right")}>
            <button title="menu" className={cx("btn-menu")}>
                <i className={cx("ti-layout-grid3")}></i>
            </button>
            <a className={cx("brand")} href="/">To do</a>
        </div>
        <div className={cx("toolbar-search")}>
            <div className={cx("search")}>
                <button title="Search" className={cx("icon-search")}>
                    <i className={cx("ti-search")}></i>
                </button>
                <input className={cx("input")} type="text" />
            </div>
        </div>
        <div className={cx("right")}>
            <button title="settings" className={cx("btn-action")}>
                <i className={cx("ti-settings")}></i>
            </button>
            <button title="help" className={cx("btn-action")}>
                <i className={cx("ti-help")}></i>
            </button>
            <button title="announcement" className={cx("btn-action")}>
                <i className={cx("ti-announcement")}></i>
            </button>
            <button title="avatar" className={cx("btn-action")}>
                <div className={cx("wrap-avatar")}>
                    <div className={cx("inner")}>
                        N
                    </div>
                </div>
            </button>
        </div>
    </div>);
}

export default Header;