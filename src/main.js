import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'   //added! (before in cmd: install axios!!!)

Vue.config.productionTip = false
Vue.prototype.$http = axios   //added!
// Vue.prototype.$host = "http://localhost:8080" //ACTIVATE WHEN IN DEVELOPMENT MODE
Vue.prototype.$host = "" //ACTIVATE BEFORE DEPLOYMENT (.jar file creation)

// require('@/views/styles.css')

// connecting token with all the requests between back- and front-end
const token = localStorage.getItem('user-token')
if (token) {
  axios.defaults.headers.common['Authorization']="Bearer "+ token
}

//Vue page (front-end) is created; token must be created before this action
new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
