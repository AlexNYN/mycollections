
<!--评价页面-->
<template>
  <div class="comments">
    <div class="comments-top">
      <div class="top-left">
        <p class='total-score'>{{seller.score}}</p>
        <p class="rating">综合评分</p>
        <p class="comparison">高于周边商家{{seller.rankRate}}%</p>
      </div>
      <div class="top-right">
        <div class="right-item">
          <span class='service'>服务态度</span>
          <div class="star-wrapper">
            <star :score='seller.serviceScore' :size='36'></star>
          </div>
          <span class="service-score">{{seller.serviceScore}}</span>
        </div>
        <div class="right-item">
          <span class='service'>服务态度</span>
          <div class="star-wrapper">
            <star :score='seller.serviceScore' :size='36'></star>
          </div>
          <span class="service-score">{{seller.serviceScore}}</span>
        </div>
        <div class="right-item">
          <span class='service'>送达时间</span>
          <span class="delivery-time">{{seller.deliveryTime}}分钟</span>
        </div>
      </div>
    </div>

    <div class="comments-mid"></div>
    <div class="comments-main">
      <div class="main-top">
        <ratingselect :positive='this.positive.length' :ratings='this.ratings'></ratingselect>
      </div>
      <div class="comment-wrapper">
        <ul class='rating-wrapper'>
          <li class='rating' v-for='rating in ratings'>
            <div class="avatar-wrapper">
              <img :src="rating.avatar" alt="" class="avatar">
            </div>
            <div class="desc">
              <div class="detail">
                <span class="username">{{rating.username}}</span>
                <span class="rateTime">{{rating.rateTime}}</span>
              </div>
              <div class="detail">
                <star class='score' :score='rating.score' :size='24'></star>
                <span class="deliveryTime" v-if='rating.deliveryTime'>{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="content">{{rating.text}}</p>
              <div class="detail">
                <span :class="rating.rateType==0?'icon-thumb_up':'icon-thumb_down'"></span>
                <ul class='recommend'>
                  <span v-for='item in rating.recommend' class='item'>
                    {{item}}
                  </span>
                </ul>
              </div>              
            </div>
          </li>
        </ul>
      </div>
    </div>

        <!-- 购物车组件 -->
    <cart :deliveryPrice='seller.deliveryPrice' :minPrice='seller.minPrice' :selectedFood='selectedFood'></cart>
  </div>
</template>

<script>
import axios from 'axios'
import star from '../star/star'
import cart from '../cart/cart'
// 评价组件
import ratingselect from '../ratingselect/ratingselect'

const ERRNO = 0
export default {
  name: 'comments',
  props:{
    seller:{
      type:Object,
      required:true
    }
  },
  components:{ star,cart,ratingselect },
  data () {
    return {
      ratings:[],
      positive:[]
    }
  },

  created(){
    // 获取所有评价
    this.getRatings()
  },

  methods:{
    async getRatings() {
      await axios.get('/api/ratings').then(res=>{
          let { errno,data } = res.data
          if(errno === ERRNO){
            this.ratings = data
          }
      })
      this.positive = this.ratings.filter(i=>i.rateType === 0)
    }
  }

}
</script>
<style lang="stylus" scoped>
  @import '../../common/stylus/mixin.styl'
  .comments
    display:flex
    flex-direction:column
    width:100%
    .comments-top
      display:flex
      position:relative
      border-1px(#eeeff0)
      padding:18px 0      
      .top-left
        width:137.5px
        text-align:center
        border-right:1px solid #ddd
        .total-score
          font-size:24px
          color:rgb(255,153,0)
          line-height:28px
          margin-bottom:6px
        .rating
          font-size:12px
          color:#000
          line-height:12px
          margin-bottom:8px
        .comparison
          font-size:10px
          color:rgb(7,17,27)
          line-height:10px
          margin-bottom:6px
      .top-right
        width:237px
        flex:1 0
        margin:0 24px
        .right-item
          display:flex
          box-sizing: border-box
          font-size:12px
          color:black
          margin-bottom:6px
          .service
            line-height:18px  
          .star-wrapper
            margin:0 12px   
          .service-score
            font-size:12px
            color:rgb(255,153,0)
            line-height:18px
          .delivery-time
            margin:0 12px
            font-size:12px
            color:rgb(147,153,159)
            line-height:18px
    .comments-mid
      flex:1 0
      height:16px;
      background:#f3f5f7 
      position:relative       
      border-1px(#eeeff0)     
    .comments-main
      flex:1 0   
      .main-top
        position:relative
        border-1px(#ddd) 
      .comment-wrapper
        width:100%
        overflow:hidden
        .rating
          display:flex
          position:relative
          margin:18px
          padding-bottom:18px
          border-1px(#ddd)
          .avatar-wrapper
            flex:0 0 28px
            .avatar
              width:28px
              height:28px
              border-radius:50%
              margin-right:12px
          .desc
            flex:1 0
            .detail
              display:flex
              font-size:0
              &:nth-child(1)
                justify-content:space-between
                margin-bottom:4px
              &:nth-child(2)
                margin-bottom:6px
              .username
                font-size:10px
                color:rgb(7,17,27)
                line-height:12px
              .rateTime
                display:inline-block
                font-size:10px
                font-weight:200
                color:rgb(147,153,159)
                line-height:12px
                float:right
              .score
                vertical-align:middle !important
              .deliveryTime
                font-size:10px
                font-weight:200
                color:rgb(147,153,159)
                line-height:12px
                margin-left:6px
              .icon-thumb_up
                font-size:12px
                color:rgb(0,160,220)
                line-height:16px
              .icon-thumb_down
                font-size:12px
                color:rgb(183,187,191)
                line-height:16px
              .recommend
                font-size:0             
                .item
                  display:inline-block
                  padding:3px 6px
                  border:1px solid rgba(7,17,28,0.1)
                  border-radius:2px
                  font-size:9px
                  color:rgb(147,153,159)
                  line-height:16px
                  margin-left:8px
                  margin-bottom:8px      
            .content
              font-size:12px
              color:rgb(7,17,27)
              line-height:18px
              margin-bottom:8px
</style>

