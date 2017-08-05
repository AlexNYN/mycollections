
<!--星星组件-->
<template>
  <div class="star" :class='starType'>
    <span class='star-item' v-for='itemClass in  itemClasses' :class='itemClass'></span>
  </div>
</template>

<script>

const LENGTH=5;
const CLS_ON='on'
const CLS_HALF='half'
const CLS_OFF='of'

export default {
  props:{
      size:{
          type:Number
      },
      score:{
          type:Number
      }
  },
  computed:{
      starType() {
          return 'star-'+this.size
      },
      itemClasses() {
          let result = []
          let score = Math.floor(this.score*2)/2 // 向下取整
          let hasDecimal = score % 1==0 //是否有小数
          let integer = Math.floor(score) // 有几个星星的个数

          for(let i=0;i<integer;i++){
              result.push(CLS_ON)
          }

          if(hasDecimal){ // 如果有小数
              result.push(CLS_HALF)
          }

          while(result.length<LENGTH){
            result.push(CLS_OFF)
          }

          return result
      }
  },
  name: 'star',
  data () {
    return {
      
    }
  }
}
</script>
<style lang="stylus">

@import '../../common/stylus/mixin.styl'
    .star
        .star-item
            display:inline-block
            background-repeat:no-repeat
        &.star-48
          .star-item
            width:20px
            height:20px
            margin-right:22px
            background-size:20px 20px
            &.last-child
              margin-right:0
            &.on
              bg-image('star48_on')
            &.half
              bg-image('star48_half')
            &.off
              bg-image('star48_off')
        &.star-36
          .star-item
            width:15px
            height:15px
            margin-right:16px
            background-size:15px 15px
            &.last-child
              margin-right:0
            &.on
              bg-image('star36_on')
            &.half
              bg-image('star36_half')
            &.off
              bg-image('star36_off')
        &.star-24 
          .star-item
            width:10px
            height:10px
            margin-right:3px
            background-size:10px 10px
            &.last-child
              margin-right:0
            &.on
              bg-image('star24_on')
            &.half
              bg-image('star24_half')
            &.off
              bg-image('star24_off')       
</style>
