<template>
    <div class="ratingselect">
        <div class="ratingType">
            <span class='ratingItem'>
                {{desc.all}}
                <span class="count">{{this.ratings.length}}</span>
            </span>
            <span class='ratingItem'>
                {{desc.positive}}
                <span class="count">{{this.positive}}</span>
            </span>
            <span class='ratingItem'>
                {{desc.negative}}
                <span class="count">{{this.ratings.length-this.positive}}</span>
            </span>   
        </div>
        <div class="switch">
            <span class="icon-check_circle"></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script>
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

export default {
  name: 'ratingselect',
  // 要维护的props
  props:{
      // 评论数组
      ratings:{
        type:Array,
        default:[]
      },
      // 选择类型
      selectType:{
        type:Number,
        default:ALL
      },
      positive:{
          type:Number
      },
      // 只显示内容评价的boolean值
      onlyContent:{
        type:Boolean,
        default:false // 默认查看全部
      },
      desc:{
          type:Object,
          default() {
              return {
                  all:'全部',
                  positive:'满意',
                  negative:'不满意'
              }
          }
      }
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="stylus">
  @import '../../common/stylus/mixin.styl'
      .ratingselect
        padding:18px
        .ratingType
          display:flex
          position:relative        
          border-1px(#ddd)
          .ratingItem
            padding:10px 11px 10px 12px
            font-size:12px
            margin-right:8px
            margin-bottom:18px
            &:nth-child(1)
              color:#fff
              background:#00A0DC
            &:nth-child(2)
              background:#CCECF7
            &:nth-child(3)
              background:#EAEBED    
            .count
              display:inline-block
              margin-left:4px
              transform:scale(0.8)
        .switch
          margin-top:18px
          color:#B7BBBF  
          .icon-check_circle  
            font-size:24px  
            vertical-align:middle                                                     
          .text                       
            font-size:12px
</style>
