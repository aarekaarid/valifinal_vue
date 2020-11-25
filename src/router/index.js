import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Generator from "@/views/Generator";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/testgenerator',
    name: 'Generator',
    component: Generator
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
