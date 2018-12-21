import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({

  srcollBehavior(to){
    if(to.hash){
      return {
        selector:to.hash
      }
    }
  },
  // base: '/my-world/docs',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
  ]
})
