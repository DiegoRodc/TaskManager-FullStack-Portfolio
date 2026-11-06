import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Login from '@/views/Login.vue' 
import { authenticated } from '@/util'




const checkAuth = async (to, from, next) => {
 try {
   if (await authenticated()) next()
   else next({
     path: '/login',
     replace: true
   })
 } catch (error) {
   console.error(error.message)
   next({
     path: '/login',
     replace: true
   })
 }
}


const routes = [
 // {
 //   path: '/',
 //   name: 'home',
 //   component: HomeView
 // },
 {
   path: '/',
   name: 'Home',
   component: Home,
   beforeEnter: checkAuth,
   props: true
 },


 {
   path: '/about',
   name: 'about',
   // route level code-splitting
   // this generates a separate chunk (about.[hash].js) for this route
   // which is lazy-loaded when the route is visited.
   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
 },
 {
   path: '/login',
   name: 'Login',
   component: Login,
 }
]


const router = createRouter({
 history: createWebHistory(process.env.BASE_URL),
 routes
})


export default router