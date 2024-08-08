import classNames from "classnames/bind";

import styles from "./Register.module.scss";
import Background from "~/pages/components/Background";
import Footer from "~/pages/components/Footer";
import FormRegister from "~/components/FormRegister";
import Button from "~/components/Button";
import { useStore } from "~/store";


const cx = classNames.bind(styles);


function Register() {
    const [state, dispatch] = useStore();
    const { theme } = state;

    return (<div className={cx("container")}>
        <Background />
        <Button to={"/"} className={cx("btn-back", {
            dark: theme.isDarkMode
        })} leftIcon={<i className="ti-angle-left"></i>}>Back</Button>
        <main className={cx("wrapper")}>
            <FormRegister className={{ dark: theme.isDarkMode }} />
        </main>
        <Footer className={{ dark: theme.isDarkMode }} />
    </div>);
}

export default Register;