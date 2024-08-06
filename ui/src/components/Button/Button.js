import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    children,
    className,
    onClick,
    disabled,
    leftIcon,
    rightIcon,
    ...passProps
}, ref) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps
    }

    if (disabled) {
        // delete props.onClick;
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }
    console.log(className);
    const dynamicClass = className.split(' ');
    const classes = cx("wrapper", ...dynamicClass, {
        disabled
    })
    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        props.target = '_blank';
        Comp = 'a';
    }

    return (<Comp type="button" className={classes} {...props}>
        {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
        <span className={cx('title')}>{children}</span>
        {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
    </Comp>);
}

export default Button;