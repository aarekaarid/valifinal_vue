import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'   //added! (before in cmd: install axios!!!)

Vue.config.productionTip = false
Vue.prototype.$http = axios   //added!

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
