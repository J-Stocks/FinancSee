import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from "@/views/HomePage";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/companies',
    name: 'CompanyIndex',
    component: () => import(/* webpackChunkName: "companies" */ '../views/companies/CompanyIndex.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
