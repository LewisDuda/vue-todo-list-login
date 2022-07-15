import { createRouter, createWebHashHistory } from 'vue-router';
import store from '../store/index.js'

const Login = () => import("../views/Login.vue")
const Register = () => import("../views/Register.vue")
const Home = () => import("../views/Home.vue")
const AllTodoLists = () => import("../components/AllTodoLists/index.vue")
const ActiveTodoLists = () => import("../components/ActiveTodoLists/index.vue")
const CompletedTodoLists = () => import("../components/CompletedTodoLists/index.vue")
const Profile = () => import("../views/Profile.vue")
const NotFound = () => import("../views/NotFound.vue")

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta : {
            requiredAuth: true
        },
        children : [
            {
                path: 'all',
                component: AllTodoLists
            },
            {
                path: 'active',
                component: ActiveTodoLists
            },
            {
                path: 'completed',
                component: CompletedTodoLists
            }
        ]
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta : {
            requiredAuth: true
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    },
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if(to.meta.requiredAuth && !store.state.auth.loggedIn){
        return next({ name: 'Login' })
    } else {
        next()
    }
})

export default router