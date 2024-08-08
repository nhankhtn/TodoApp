import classNames from "classnames/bind";
import { useState } from "react";

import styles from "./Home.module.scss";
import Background from "~/pages/components/Background";
import Header from "~/pages/components/Header";
import Footer from "~/pages/components/Footer";
import TodoList from "~/pages/components/TodoList";
import Sidebar from "~/pages/components/Sidebar";
import { useStore } from "~/store";

const cx = classNames.bind(styles);

function Home() {
    const [state, dispatch] = useStore();
    const { theme } = state;

    return (
        <div className={cx("container")}>
            <Background />
            <Header />
            <main className={cx("wrapper", {
                dark: theme.isDarkMode
            })}>
                <TodoList className={{ dark: theme.isDarkMode }} />
                <Sidebar />
            </main>
            <Footer className={{ dark: theme.isDarkMode }} />
        </div>
    );
}

export default Home;