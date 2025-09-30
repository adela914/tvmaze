import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ShowView from '@/views/ShowView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/show/:id', component: ShowView },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
