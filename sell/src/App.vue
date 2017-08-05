<template>
  <div id="app">
    <!--头部-->
    <my-header :seller='seller'></my-header>

    <!--tab切换-->
    <tab></tab>

    <!--router-view切换-->
    <router-view></router-view>
  </div>
</template>

<script>

//头部组件
import myHeader from '@/components/header/header'
//tab
import tab from '@/components/tab/tab'

import product from '@/components/product/product'
import comments from '@/components/comments/comments'
import seller from '@/components/seller/seller'

import axios from 'axios'

const ERR_OK=0

export default {
  name: 'app',
  data() {
    return {
      //商家
      seller:{}
    }
  },
  //组件生成之后请求商家数据
  created(){
    axios.get('/api/seller').then(res=>{
      if(res.data.errno === ERR_OK){
        this.seller = res.data.data
      }
    }).catch(err=>{})
  },
  components:{
    myHeader,tab
  }
}
</script>

<style lang="stylus">

</style>
