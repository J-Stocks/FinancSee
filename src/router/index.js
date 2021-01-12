import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from "@/views/HomePage";
import NotFound from "@/views/NotFound";

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
  },
  {
    path: '/company/:symbol',
    name: 'CompanyDetails',
    component: () => import(/* webpackChunkName: "company-details" */ '../views/companies/CompanyDetails.vue')
  },
  {
    path: '/company/:symbol/graph',
    name: 'CompanyGraph',
    component: () => import(/* webpackChunkName: "company-graph" */ '../views/companies/CompanyGraph.vue')
  },
  {
    path: '/currency',
    name: 'Currency',
    component: () => import(/* webpackChunkName: "currency-graph" */ '../views/CurrencyGraph.vue')
  },
  {
    path: '*',
    name: '404',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
