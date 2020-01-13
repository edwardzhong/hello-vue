import Vue from 'vue'
import Router from 'vue-router'
import store from './store';
// import Home from './components/home.vue'
// import Users from './components/users.vue'
import { needLogin } from './config/auth'

//异步加载
const Home = () => import('./components/home.vue')
const Users = () => import('./components/users.vue')

Vue.use(Router)

//路由
const routes = [{
    path: '/',
    name: 'home',
    component: Home
}, {
    path: '/users',
    name: 'users',
    component: Users
},
{ path: '*', redirect: '/'}]


const router = new Router({
    mode: "history",
    routes
});

//全局拦截
router.beforeEach((to, _, next) => {
    if (!store.getters.isLogin && needLogin.find(name => to.path.search(name) > -1))
        next({ path: '/login', query: { r: to.path, ...to.query } });
    else
        next();
});
export default router;