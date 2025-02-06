import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import DoggyPage from '../components/DoggyPage.vue'
import KittyCatPage from '../components/KittyCatPage.vue'
import CanvasPage from '../components/CanvasPage.vue'
import ContactForm from '../components/ContactForm.vue'
import HeadingComponent from '../components/HeadingComponent.vue'
import HelloWorld from '../components/HelloWorld.vue'
import SnakeGame from '../components/SnakeGame.vue'
import AboutPage from '../components/AboutPage.vue'
import PhotoCardPage from '../components/PhotoCardPage.vue'
import RpgGame from '../components/RpgGame.vue'
import EmailSignature from '../components/EmailSignature.vue'
import PageList from '../components/PageList.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage
  },
  {
    path: '/dogs',
    name: 'Dogs',
    component: DoggyPage
  },
  {
    path: '/cats',
    name: 'Cats',
    component: KittyCatPage
  },
  {
    path: '/canvas',
    name: 'Canvas',
    component: CanvasPage
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactForm
  },
  {
    path: '/heading',
    name: 'Heading',
    component: HeadingComponent
  },
  {
    path: '/hello',
    name: 'Hello',
    component: HelloWorld
  },
  {
    path: '/snake',
    name: 'Snake',
    component: SnakeGame
  },
  {
    path: '/photocard',
    name: 'PhotoCard',
    component: PhotoCardPage
  },
  {
    path: '/rpg',
    name: 'RPG',
    component: RpgGame
  },
  {
    path: '/email',
    name: 'Email',
    component: EmailSignature
  },
  {
    path: '/pages',
    name: 'Pages',
    component: PageList
  }
]



const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 