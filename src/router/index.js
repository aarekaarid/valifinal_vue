import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Generator from "@/views/InsertData";
import InsertData from "@/views/InsertData";
import InsertGrade from "@/views/InsertGrade";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/insertdata',
    name: 'InsertData',
    component: InsertData
  },
  {
    path: '/insertdata',
    name: 'InsertData',
    component: InsertData
  },
  {
    path: '/insertgrade',
    name: 'InsertGrade',
    component: InsertGrade
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
