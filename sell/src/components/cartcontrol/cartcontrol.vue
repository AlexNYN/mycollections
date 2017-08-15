
<!--点击加入购物车小球控件-->
<template>

  <div class="cart-control">
    <transition name="move">
      <div class="cart-decrease" v-show='food.count>0' @click='minusCart'>
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>

    <div class="cart-count" v-show='food.count>0'>{{food.count}}</div>

    <div class="cart-increase icon-add_circle" @click='addCart'></div>
  </div>

</template>

<script>
import  Vue from 'vue'
export default {
  name: 'cartcontrol',
  props:{
    food:{
      type:Object
    }
  },
  created() {
  },
  data () {
    return {
      
    }
  },
  methods:{
    minusCart() {
      if(!event._constructed){
        return 
      } 
      this.food.count--
    },
    addCart() {
      console.log(1)
      if(!this.food.count){ //如果food.count属性不存在
        Vue.set(this.food,'count',1)
      }else{
        this.food.count++
      }
    }
  }
}
</script>

<style lang="stylus">
  .cart-control
    font-size:0
    .cart-decrease
      display:inline-block
      font-size:24px
      .inner
        display:inline-block  
        line-height:24px
        padding:6px
        color:rgb(0,160,220)
        transition: all .4s linear
        transform:rotate(0)        
      &.move-enter-active, .move-leave-active 
        transition: all .4s linear
      &.move-enter, .move-leave-to /* .fade-leave-active in below version 2.1.8 */ 
        opacity: 0
        transform:translate3D(24px,0,0)
        .inner
          transform:rotate(180deg)
    .cart-increase
      display:inline-block
      font-size:24px
      line-height:24px
      padding:6px
      color:rgb(0,160,220)     
    .cart-count
      display:inline-block
      text-align:center
      vertical-align:top
      width:12px
      padding-top:6px
      line-height:24px
      font-size:10px
      color:rgb(147,153,159)
</style>
