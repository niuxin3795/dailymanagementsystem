import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/helloWorld',
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../components/HelloWorld.vue'
          ),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Login.vue'),
  },
]

const router = new VueRouter({
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (!sessionStorage.getItem('token')) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath,
        },
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
