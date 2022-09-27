/**
 * Vue Router
 *
 * @library
 *
 * https://router.vuejs.org/en/
 */

// Lib imports
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import Router from 'vue-router'
import Meta from 'vue-meta'
// Routes
import paths from './paths'
import { LOCALSTORAGE } from '../constants'

const hasToken = (to, from, next) => {
  const token = localStorage.getItem(LOCALSTORAGE.JWT)
  if (token) {
    router.push('/')
  } else {
    next()
  }
}

const requireAuth = (to, from, next) => {
  const token = localStorage.getItem(LOCALSTORAGE.JWT)
  if (token) {
    next()
  } else {
    router.push('/login')
  }
}

function route (path, view, name, component) {
  return {
    name: name || view,
    path,
    component,
    beforeEnter: name === 'Login' ? hasToken : requireAuth
  }
}

Vue.use(Router)
// Create a new router
const router = new Router({
  mode: 'history',
  routes: paths.map(path => route(path.path, path.view, path.name, path.component)
  ).concat([
    { path: '*', redirect: '/' }
  ]),
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  }
})

Vue.use(Meta)

// Bootstrap Analytics
// Set in .env
// https://github.com/MatteoGabriele/vue-analytics
if (process.env.GOOGLE_ANALYTICS) {
  Vue.use(VueAnalytics, {
    id: process.env.GOOGLE_ANALYTICS,
    router,
    autoTracking: {
      page: process.env.NODE_ENV !== 'development'
    }
  })
}

export default router
