import classNames from "classnames/bind";

import styles from "./Background.module.scss";

const cx = classNames.bind(styles);


function Background() {
    return (<div className={cx("background")}>
        <h1 className={cx("brand")}>T O D O L I S T</h1>
    </div>);
}

export default Background;