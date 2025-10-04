import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import ShowDetailsPage from '@/views/ShowDetailsPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { name: 'show', path: '/show/:id', component: ShowDetailsPage },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
