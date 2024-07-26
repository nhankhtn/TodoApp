import classNames from "classnames/bind";
import { useState } from "react";
import styles from "./Sidebar.module.scss";

import { CalendarIcon, HouseIcon, HumanIcon, MenuIcon, StarIcon, SunIcon } from "~/components/Icons";

const cx = classNames.bind(styles);

function Sidebar() {
    const [showMenu, setShowMenu] = useState(true);
    return (
        showMenu &&
        (<aside className={cx("wrapper")}>
            <div className={cx("heading")}>
                <button
                    onClick={e => setShowMenu(false)}
                    className={cx("btn-show")}>
                    <MenuIcon />
                </button>
            </div>
            <div className={cx("navigate")}>
                <a className={cx("category", {
                    active: true
                })} href="/">
                    <SunIcon />
                    My Day
                </a>
                <a className={cx("category")} href="/important">
                    <StarIcon />
                    Important
                </a>
                <a className={cx("category")} href="/planned">
                    <CalendarIcon />
                    Planned
                </a>
                <a className={cx("category")} href="/assigned">
                    <HumanIcon />
                    Assigned to me
                </a>
                <a className={cx("category")} href="/tasks">
                    <HouseIcon />
                    Tasks
                </a>
            </div>
        </aside>)
    )
};

export default Sidebar;