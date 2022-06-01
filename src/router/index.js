import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/product/:id',
    name: 'ProductView',
    component: () => import('../views/ProductView')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
