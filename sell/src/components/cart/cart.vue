
<!--tab切换组件-->
<template>
    <div class='shop-cart'>

        <div class="content">

            <!-- 左边 -->
            <div class="content-left">
                <!-- 购物车图标 -->
                <div class="logo-wrapper">
                    <div class="logo" :class="{'highlight':totalCount>0}">
                        <i class='icon-shopping_cart' :class="{'highlight':totalCount>0}"></i>
                    </div>
                    <div class="num" v-show='totalCount>0'>{{totalCount}}</div>
                </div>
                <!--总价-->
                <div class="total-price" :class="{'highlight':totalPrice>0}">¥ {{totalPrice}}</div>
                <!-- 配送费 -->
                <div class="delivery-price">另需配送费 ¥ {{deliveryPrice}} 元</div>
            </div>

            <!-- 右边结算按钮 -->
            <div class="content-right">
                <div class="pay" :class='payClass'>
                   {{payDesc}}
                </div>
            </div>

        </div>

    </div>
</template>
<script>
    export default {
        name:'cart',
        props:{
            // product父组件传进来的选择商品的数组
            selectedFood:{
                type:Array,
                default() {
                    return []
                }
            },
            // 配送费
            deliveryPrice:{
                type:Number,
                default:0
            },
            // 起送价
            minPrice:{
                type:Number,
                default:0
            }
        },
        computed:{
            // 选择商品的总价格（每一个商品对象的数量*单价）
            totalPrice() {
                let total = 0
                this.selectedFood.forEach((food)=>{
                    total += food.price*food.count
                })
                return total
            },
            //一共选择了多少种商品
            totalCount() {
                let count = 0
                this.selectedFood.forEach((food)=>{
                    count += food.count
                })
                return count                
            },
            payDesc() {
                if(this.totalPrice === 0){
                    return `¥${this.minPrice}元起送`
                }else if(this.totalPrice < this.minPrice){ // 小于起送价格
                    return `还差${this.minPrice-this.totalPrice}元起送`
                }else{// 超过起送价
                    return '去结算'
                }
            },
            payClass() {
                if(this.totalPrice < this.minPrice){
                    return 'below'
                }else{
                    return 'equal'
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
    @import "../../common/stylus/mixin.styl"
    .shop-cart
      position:fixed
      left:0
      bottom:0
      width:100%
      z-index:50
      background:#000
      .content
        display:flex
        background:#141d27
        font-size:0
        color:rgba(255,255,255,0.4)
        .content-left
          flex:1
          .logo-wrapper
            display:inline-block
            position:relative
            top:-12px
            margin:0 12px
            padding:6px
            width:56px
            height:56px
            box-sizing:border-box
            vertical-align:top
            border-radius:50%   
            .logo
              width:100%
              height:100%
              border-radius:50%
              background:#2b343c
              text-align:center
              &.highlight
                background:rgb(0,160,220)  
              .icon-shopping_cart
                line-height:44px
                font-size:24px
                color:#80858a
                &.highlight
                  color:#fff
            .num
              position:absolute
              top:0
              right:0
              width:24px
              height:16px
              line-height:16px
              text-align:center
              border-radius:16px
              font-size:9px
              font-weight:700
              color:#fff
              background-color:rgb(240,20,20)
              box-shadow:0px 4px 8px 0 rgba(0,0,0,0.4)
          .total-price
            display:inline-block   
            vertical-align:top
            margin-top:12px
            line-height:24px      
            padding-right:12px
            box-sizing:border-box
            border-right:1px solid rgba(255,255,255,0.1)
            font-size:16px
            font-weight:700  
            &.highlight
              color:rgb(255,255,255)            
          .delivery-price
            display:inline-block  
            vertical-align:top
            line-height:24px      
            margin:12px 0 0 12px           
            font-size:10px             
        .content-right
          flex:0 0 105px
          width:105px
          .pay
            height:55px
            line-height:55px
            text-align:center
            font-size:12px  
            font-weight:700 
            &.below
              background:#2b333b
            &.equal
              background:#00b43c
              color:#fff                        
</style>