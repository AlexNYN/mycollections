import Vue from 'vue'
import Router from 'vue-router'

import product from '@/components/product/product'
import comments from '@/components/comments/comments'
import seller from '@/components/seller/seller'

Vue.use(Router)

export default new Router({
  linkActiveClass :"active",
  routes: [
    {
      path:'/product',
      component:product
    },
    {
      path:'/comments',
      component:comments
    },
    {
      path:'/seller',
      component:seller
    },
  ]
})