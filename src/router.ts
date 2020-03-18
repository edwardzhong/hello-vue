import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'
import store from './store';
import pages from './config/page'
import { needLogin } from './config/auth'

//异步加载
// const Home = () => import('./components/home.vue')
// const Users = () => import('./components/users.vue')

Vue.use(Router)
//路由
const routes: RouteConfig[] = pages.map(p => ({ path: p.path, name: p.name, component: () => import(`./components/${p.name}.vue`) }))
routes.push({ path: '*', redirect: '/' });

const router = new Router({
  mode: "history",
  routes
});

//全局拦截
router.beforeEach((to, _, next) => {
  if (!store.getters.isLogin && needLogin.some(name => to.path.search(name) > -1))
    next({ path: '/login', query: { r: to.path, ...to.query } });
  else
    next();
});
export default router;