import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Generator from "@/views/InsertData";
import InsertData from "@/views/InsertData";
import InsertGrade from "@/views/InsertGrade";
import GenerateTest from "@/views/GenerateTest";
import SiteUser from "@/views/SiteUser";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/siteuser',
    name: 'SiteUser',
    component: SiteUser
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
    path: '/generate',
    name: 'GenerateTest',
    component: GenerateTest
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
  }
]

const router = new VueRouter({
  routes
})

export default router
