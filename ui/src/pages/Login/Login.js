import classNames from "classnames/bind";

import styles from "./Login.module.scss";
import Background from "~/pages/components/Background";
import Footer from "~/pages/components/Footer";
import FormLogin from "~/components/FormLogin";
import Button from "~/components/Button";
import { useStore } from "~/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);


function Login() {
    const [state, dispatch] = useStore();
    const { theme } = state;

    return (<div className={cx("container")}>
        <Background />
        <Button to={"/"} className={cx("btn-back", {
            dark: theme.isDarkMode
        })} leftIcon={<FontAwesomeIcon icon={faChevronLeft} />}>Back</Button>
        <main className={cx("wrapper")}>
            <FormLogin className={{ dark: theme.isDarkMode }} />
        </main>
        <Footer className={{ dark: theme.isDarkMode }} />
    </div>);
}

export default Login;