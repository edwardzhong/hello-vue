import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'
import store from './store';
import pages from './config/page'

//异步加载
// const Home = () => import('./components/home.vue')
// const Users = () => import('./components/users.vue')

Vue.use(Router)
//路由
const routes: RouteConfig[] = pages.map(p => {
  const com: RouteConfig = { path: p.path, name: p.name, component: () => import(`./components/${p.name}.vue`) };
  if (p.children) {
    com.children = p.children.map(c => ({ path: c.path, name: c.name, component: () => import(`./components/${c.name}.vue`) }))
    com.children.push({ path: '*', redirect: p.children[0].name })
  }
  return com;
});
routes.push({ path: '*', redirect: '/' });

const router = new Router({
  mode: "history",
  routes
});

//全局拦截
router.beforeEach((to, _, next) => {
  if (!store.getters.isLogin && pages.some(p => p.isAuth && to.path.search(p.path) > -1))
    next({ path: '/login', query: { r: to.path, ...to.query } });
  else
    next();
});

export default router;