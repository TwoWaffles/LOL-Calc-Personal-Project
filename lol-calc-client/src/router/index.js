import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexView from '../views/IndexView.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: IndexView
    }
    // Below is how to add another page so you add /champion to your url and get a new page
    // {
    //   path: '/champions',
    //   name: 'champions',
    //   component: ChampionView
    // }



    
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
