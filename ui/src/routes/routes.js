import Home from "~/pages/Home"
import Login from "~/pages/Login"
import Register from "~/pages/Register"



const publicRoutes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    }
]

export { publicRoutes }