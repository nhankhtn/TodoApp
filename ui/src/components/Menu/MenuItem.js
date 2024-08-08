import classNames from "classnames/bind";

import styles from "./Menu.module.scss";
import Button from "../Button";


const cx = classNames.bind(styles)


function MenuItem({ item }) {
    return (
        <Button className={cx("menu-item-btn")} onClick={item.action}>{item.title}</Button>
    )
}

export default MenuItem;