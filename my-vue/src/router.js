import Vue from 'vue'
import Router from 'vue-router'
import EventList from './views/EventList.vue'
import EventShow from './views/EventShow.vue'
import EventCreate from './views/EventCreate.vue'
import store from '@/store/store'
import NProgress from 'nprogress'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList,
      props: true
    },
    {
      path: '/event/:id',
      name: 'event',
      component: EventShow,
      props: true,
      beforeEnter(routerTo, routerFrom, next) {
        store
          .dispatch('event/fetchEventById', routerTo.params.id)
          .then(event => {
            routerTo.params.event = event
            next()
          })
      }
    },
    {
      path: '/event/create',
      name: 'event-create',
      component: EventCreate
    }
  ]
})

router.beforeEach((routerTo, routeFrom, next) => {
  NProgress.start()
  next()
})

router.beforeResolve((routerTo, routerFrom, next) => {
  if (routerTo.name === 'event-list') {
    const currentPage = parseInt(routerTo.query.page) || 1

    store
      .dispatch('event/fetchEvents', {
        page: currentPage
      })
      .then(events => {
        routerTo.query.page = currentPage
        routerTo.params.events = events
        routerTo.params.page = currentPage
        next()
      })
  } else {
    next()
  }
})

// eslint-disable-next-line no-unused-vars
router.afterEach((routerTo, routerFrom) => {
  NProgress.done()
})

export default router
