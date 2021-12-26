import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Quests from '../views/Quests.vue'
import Raw from '../views/Raw.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/quests',
    name: 'Quests',
    component: Quests
  },
  {
    path: '/raw',
    name: 'Raw',
    component: Raw
  }
]

const router = new VueRouter({
  routes
})

export default router
