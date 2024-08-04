import classNames from "classnames/bind";

import styles from "./MyDay.module.scss"
import { MenuIcon } from "~/components/Icons";
const cx = classNames.bind(styles);

function MyDay() {
    return (
        <div className={cx("wrapper")}>
            <div>
                <div>
                    <div>
                        <button
                            title="Menu"
                            className={cx("btn-show")}>
                            <MenuIcon />
                        </button>
                        <div className={cx("title-item")}>
                            <h2>Ngày của tôi</h2>
                        </div>
                        <div className={cx("title-item")}>
                            <h2>Ngày của tôi</h2>
                        </div>
                        <div className={cx("title-item")}>
                            <h2>Ngày của tôi</h2>
                        </div>
                        <div className={cx("title-item")}>
                            <h2>Ngày của tôi</h2>
                        </div>
                    </div>
                    <div className={cx("toolbar-subline")}>
                        <span>thứ hai, 29 tháng 7</span>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    );
}

export default MyDay;