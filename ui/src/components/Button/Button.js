import classNames from "classnames/bind";

import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

function Button({
    children,
    className,
    onClick,
    disabled,
    leftIcon,
    rightIcon,
    ...passProps
}) {

    if (disabled) {
        // delete props.onClick;
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    const props = {
        onClick,
        ...passProps
    }

    const classes = cx("wrapper", {
        [className]: className,
        disabled
    })

    return (<button type="button" className={classes} {...props}>
        {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
        {children}
        {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
    </button>);
}

export default Button;