import config from "~/config";

import MyDay from "~/pages/MyDay";
import Important from "~/pages/Important";
import Planned from "~/pages/Planned";
import Tasks from "~/pages/Tasks";
import Assigned from "~/pages/Assigned";
import Login from "~/pages/Login";
import Settings from "~/pages/Settings";

const publicRoutes = [
    {
        path: config.routes.login,
        component: Login
    },
    {
        path: config.routes.myDay,
        component: MyDay
    },
    {
        path: config.routes.important,
        component: Important
    },
    {
        path: config.routes.planned,
        component: Planned
    },
    {
        path: config.routes.tasks,
        component: Tasks
    },
    {
        path: config.routes.assigned,
        component: Assigned
    },
    {
        path: config.routes.settings,
        component: Settings
    }
]

export { publicRoutes }