import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/product',
    name: 'ProductView',
    component: () => import('../views/ProductView')
  },
  {
    path: '/cart',
    name: 'CartView',
    component: () => import('../views/CartView')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
