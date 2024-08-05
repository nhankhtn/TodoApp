import classNames from "classnames/bind";

import Background from "./components/Background";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TodoList from "./components/TodoList";
import styles from "./App.module.scss";
import Footer from "./components/Footer";

const cx = classNames.bind(styles);

function App() {
  return (
    <div className={cx("container")}>
      <Background />
      <Header />
      <main className={cx("wrapper")}>
        <TodoList />
        <Sidebar />
      </main>
      <Footer />
    </div>
  );
}

export default App;
