
<!--tab切换组件-->
<template>
    <div class='tab border-1px'>
      <div class="tab-item">
        <router-link to="/product">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/comments">评价</router-link>        
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>      
      </div>
    </div>
</template>
<script>
    
</script>
<style lang="stylus">
    @import "../../common/stylus/mixin.styl"
  .tab{
    display:flex
    line-height:40px
    width:100%
    height:40px
    position:relative
    /*border-bottom:1px solid rgba(7,17,27,0.1)*/
    border-1px(rgba(7,17,27,0.1))
    .tab-item{
      flex:1
      text-align:center
      &>a{
          display:block
          font-size:14px
          color:rgb(77,85,93)
          &.active{
            color:rgb(240,20,20)
        } 
      }
    }
  }
</style>