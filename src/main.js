import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'   //added! (before in cmd: install axios!!!)

Vue.config.productionTip = false
Vue.prototype.$http = axios   //added!
Vue.prototype.$host="http://localhost:8080" //for deployment
// Vue.prototype.$host=""  //

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')

// connecting token with all the requests between back- and front-end
const token = localStorage.getItem('user-token')
if (token) {
  axios.defaults.headers.common['Authorization']="Bearer"+ token
}

