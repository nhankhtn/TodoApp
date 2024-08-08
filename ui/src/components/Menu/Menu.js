import classNames from "classnames/bind";

import styles from "./Menu.module.scss";
import MenuItem from "./MenuItem";


const cx = classNames.bind(styles)

function Menu({ className, items }) {
    return (<div className={cx("wrapper", className)}>
        {items.map((item, index) => <MenuItem key={index} item={item} />)}
    </div>);
}

export default Menu;