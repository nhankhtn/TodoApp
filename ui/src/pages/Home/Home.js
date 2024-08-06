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
const initTodos = [
    {
        id: 1,
        title: "Ăn sáng",
        description: "Ăn bánh mì",
        isCompleted: false,
        createdAt: "18h30 12/2/2024"
    },
    {
        id: 2,
        title: "Ăn trưa",
        description: "Ăn cơm gà",
        isCompleted: false,
        createdAt: "18h30 12/2/2024"
    },
    {
        id: 3,
        title: "Ăn chiều",
        description: "Ăn chè",
        isCompleted: false,
        createdAt: "18h30 12/2/2024"
    },
    {
        id: 4,
        title: "Ăn tối",
        description: "Ăn mì",
        isCompleted: false,
        createdAt: "18h30 12/2/2024"
    }
]

function Home() {
    const [todos, setTodos] = useState(initTodos);
    const [state, dispacth] = useStore();
    const { theme } = state;

    return (
        <div className={cx("container")}>
            <Background />
            <Header />
            <main className={cx("wrapper", {
                dark: theme.isDarkMode
            })}>
                <TodoList className={{ dark: theme.isDarkMode }} todos={todos} />
                <Sidebar todos={todos} setTodos={setTodos} />
            </main>
            <Footer className={{ dark: theme.isDarkMode }} />
        </div>
    );
}

export default Home;