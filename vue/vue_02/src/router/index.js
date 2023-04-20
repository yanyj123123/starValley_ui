import Vue from 'vue'
import VueRouter from 'vue-router'

import RoleView from '../views/starValley/RoleView.vue'
import DeptView from '../views/starValley/DeptView.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/role',
    component: RoleView
  },
  {
    path:'/role',
    name:'role',
    component:RoleView
  },
  {
    path:'/dept',
    name:'dept',
    component:DeptView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
