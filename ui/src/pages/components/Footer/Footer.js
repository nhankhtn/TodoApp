import classNames from "classnames/bind";

import styles from "./Footer.module.scss";

const cx = classNames.bind(styles);

function Footer({ className }) {
    return (<div className={cx("wrapper", className)}>
        Develop by @loitaitoi
    </div>);
}

export default Footer;