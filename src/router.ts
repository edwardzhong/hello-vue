import Vue from 'vue'
import Router from 'vue-router'
// import Home from './components/home.vue'
// import Users from './components/users.vue'

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

// 全局权限验证
// router.beforeEach((to, _, next) => {
//     if(needLogin.indexOf(to.name)>-1 && !store.getters.isLogin){
//         next('/login?r=' + to.path);
//     } else {
//         next();
//     }
// });
export default router;