import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'def',
    component: Home
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/devices',
    name: 'devices',
    component: () => import('../views/About.vue')
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('../views/About.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/Home.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
