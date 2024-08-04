import classNames from "classnames/bind";
import { useRef, useState } from "react";
import styles from "./Sidebar.module.scss";

import { CalendarIcon, HouseIcon, HumanIcon, MenuIcon, StarIcon, SunIcon } from "~/components/Icons";
import { NavLink } from "react-router-dom";

const cx = classNames.bind(styles);

function Sidebar() {
    const [showMenu, setShowMenu] = useState(true)

    return (
        showMenu &&
        (<aside className={cx("wrapper")}>
            <div className={cx("heading")}>
                <button
                    title="Menu"
                    onClick={e => setShowMenu(false)}
                    className={cx("btn-show")}>
                    <MenuIcon />
                </button>
            </div>
            <div className={cx("navigate")}>
                <NavLink
                    className={({ isActive }) => cx("category", { active: isActive })}
                    to="/"
                >
                    <SunIcon />
                    My Day
                </NavLink>
                <NavLink

                    className={({ isActive }) => cx("category", { active: isActive })}
                    to="/important"
                >
                    <StarIcon />
                    Important
                </NavLink>
                <NavLink
                    className={({ isActive }) => cx("category", { active: isActive })}
                    to="/planned"
                >
                    <CalendarIcon />
                    Planned
                </NavLink>
                <NavLink
                    className={({ isActive }) => cx("category", { active: isActive })}
                    to="/assigned"
                >
                    <HumanIcon />
                    Assigned to me
                </NavLink>
                <NavLink
                    className={({ isActive }) => cx("category", { active: isActive })}
                    to="/tasks"
                >
                    <HouseIcon />
                    Tasks
                </NavLink>
            </div>
        </aside>)
    )
};

export default Sidebar;