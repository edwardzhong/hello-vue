import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../public/normalize.css'
import '../public/index.css'
import '../public/iconfont.js'
import { Message, Popover, Dialog, Loading } from 'element-ui';

Vue.use(Popover)
Vue.use(Dialog)
Vue.use(Loading)
Vue.prototype.$message = Message
Vue.config.productionTip = false
Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

