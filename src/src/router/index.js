import { createRouter, createWebHistory } from 'vue-router'
import PageList from '../components/PageList.vue'

const routes = [
  {
    path: '/pages',
    name: 'Pages',
    component: PageList
  }
]

// ... rest of the router configuration ... 