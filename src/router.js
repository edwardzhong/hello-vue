import Vue from 'vue'
import Router from 'vue-router'
// import Hello from './components/HelloWorld.vue'
// import List from './components/List.vue'

//异步加载
const Hello = () => import('./components/HelloWorld.vue')
const List = () => import('./components/List.vue')

Vue.use(Router)

//路由
const routes = [{
    path: '/',
    name: 'home',
    component: Hello
}, {
    path: '/list',
    name: 'list',
    component: List
},
{ path: '*', redirect: '/'}]

export default new Router({
    mode: "history",
    routes
})