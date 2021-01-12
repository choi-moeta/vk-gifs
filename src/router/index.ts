import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
} from 'vue-router'
import { store } from '/@/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:catchAll(.*)',
    redirect: { name: 'auth' },
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import(/* webpackChunkName: "auth" */ '/@/views/Auth.vue'),
    meta: {
      isGuestOnly: true,
      isHeaderVisible: false,
    }
  },
  {
    path: '/token',
    name: 'token',
    component: () => import(/* webpackChunkName: "token" */ '/@/views/AuthToken.vue'),
    meta: {
      isGuestOnly: true,
      isHeaderVisible: false,
    },
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: () => import(/* webpackChunkName: "gallery" */ '/@/views/Gallery.vue'),
    meta: {
      isUserOnly: true,
    },
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import(/* webpackChunkName: "settings" */ '/@/views/Settings.vue'),
    meta: {
      isUserOnly: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from) => {
  if (to.meta.isUserOnly && !store.getters.isAuthorized) {
    return { name: 'auth' }
  }
  if (to.meta.isGuestOnly && store.getters.isAuthorized) {
    return { name: 'gallery' }
  }
  // return store.getters.isAuthorized ? { name: 'gallery' } : { name: 'auth' }
})

export default router
