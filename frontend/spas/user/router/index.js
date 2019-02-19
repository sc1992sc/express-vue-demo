import Vue from 'vue'
import Router from 'vue-router'
import user from '../page/user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'user',
      component: user
    }
  ]
})
