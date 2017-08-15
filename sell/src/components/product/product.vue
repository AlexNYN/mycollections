<template>
  <div class="product">
    <div class="menu-wrapper" ref='menuWrapper'>
      <ul>
        <li v-for='(item,index) in product' class='menu-item' 
        @click='selectMenu(index,$event)' :class="{ 'current' : currentIndex == index }">
          <span class="text border-1px">
            <span v-show='item.type>0' class='icon' :class='classMap[item.type]'></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref='foodsWrapper'>
      <ul>
        <li v-for='item in product' class='foods-list food-list-hook'>
          <h1 class='title'>{{item.name}}</h1>
          <ul>
            <li v-for='food in item.foods' class='food-item border-1px'>
              <div class="icon">
                <img width='57' height='57' :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class='count'>月售:{{food.sellCount}}</span>
                  <span>好评率:{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class='now'>¥{{food.price}}</span>
                  <span class='old' v-show='food.oldPrice'>¥{{food.oldPrice}}</span>
                </div>
              </div>

               <!-- 加入购物车小球组件 -->
              <div class="cartcontrol-wrapper">
                <cartcontrol :food='food'></cartcontrol>
              </div> 

            </li>
          </ul>
        </li>
      </ul>
    </div>

    <!-- 购物车组件 -->
    <cart :deliveryPrice='seller.deliveryPrice' :minPrice='seller.minPrice' :selectedFood='selectedFood'></cart>

  </div>
</template>

<script>

import cartcontrol from '../cartcontrol/cartcontrol'
import cart from '@/components/cart/cart'
import BScroll from 'better-scroll'
import axios from 'axios'

const ERR_OK=0

export default {
  name: 'product',
  props:{
    seller:{}
  },
  components:{ 
    cart,
    cartcontrol 
  },
  data () {
    return {
      product:[],
      classMap:[],
      listHeight:[],
      scrollY:0
    }
  },
  computed:{
    currentIndex() {
      for(let i = 0; i < this.listHeight.length; i++){
        let h1 = this.listHeight[i]
        let h2 = this.listHeight[i+1]
        //判断当前scrollY是否在这两个height的区间
        if(this.scrollY >= h1 && this.scrollY < h2) return i;
      }

      return 0
    },
    // 选中的食品数组
    selectedFood() {
      let foodSelected = []
      this.product.forEach((product)=>{
        product.foods.forEach((food)=>{
          if(food.count){ // 如果当前商品有food.count这个属性
             foodSelected.push(food)
          }
        })
      })
      return foodSelected
    }
  },
  created(){
      this.classMap = ['decrease','discount','special','invoice','guarantee']
      axios.get('/api/goods').then(res=>{
        if(res.data.errno === ERR_OK){
          this.product = res.data.data
        }
        this.$nextTick(()=>{
          this._initScroll()
          this._calculateHeight(); 
        })
      }).catch(err=>{})
      console.log('created')
  },
  mounted() {
      
     let foodList = document.getElementsByClassName('food-list-hook')   
     console.log(typeof foodList)
      this.$nextTick(()=>{
        //this._initScroll();
        //this._calculateHeight();  

      })
      console.log('mounted') 
  },
  methods:{
    _initScroll() {
      console.log('initScroll!')
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click:true
      })
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
        click:true,
        probeType:3
      })

      //better-scroll on绑定事件
      this.foodsScroll.on('scroll',(pos)=>{
        this.scrollY = Math.abs(Math.round(pos.y))
      })

    },
    _calculateHeight() {     
      //let foodList = Array.from(document.querySelectorAll('.food-list-hook'))
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')       
      let height = 0
      this.listHeight.push(height)
      console.log(foodList.length) // 打印0
      for(let i = 0; i < foodList.length; i++){
          height += foodList[i].clientHeight
          this.listHeight.push(height)
      }
      
    },
    // 选择菜单
    selectMenu(index,event) {
      // 当PC端点击事件触发时，直接return
      // 只执行better-scroll派发的点击事件
      if(!event._constructed){
        return 
      } 
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')  
      this.foodsScroll.scrollToElement(foodList[index],300)    
    }
  },
}
</script>
<style lang="stylus">
@import '../../common/stylus/mixin.styl'
  .product
    display:flex
    overflow:hidden
    position:absolute
    width:100%
    top:174px
    bottom:46px
    .menu-wrapper
      flex:0 0 80px
      width:80px
      background:#f3f5f7
      .menu-item
        display:table
        height:54px
        width:56px
        line-height:14px
        padding:0 12px
        &.current
          position:relative
          z-index:10
          margin-top:-1px
          background:#fff
          font-weight:700
          .text
            border-none()
       .icon
          display:inline-block
          vertical-align:top
          width:12px
          height:12px
          background-size:12px 12px
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')  
        .text
          display:table-cell
          vertical-align:middle
          border-1px(rgba(7,17,27,0.1))
          font-size:12px
          width:56px
    .foods-wrapper
      flex:1
      .title
        padding-left:14px
        height:26px
        line-height:26px
        border-left:2px solid #d9dde1
        font-size:12px
        color:rgb(147,153,159)
        background:#f3f5f7
      .food-item
        display:flex
        margin:18px
        border-1px(rgba(7,17,27,0.1))
        padding-bottom:18px
        position:relative
        &:last-child
          border-none()
          margin-bottom:0
        .icon
          flex:0 0 57px
          margin-right:10px
        .content
          flex:1
          .name
            margin:2px 0 8px 0
            height:14px
            line-height:14px
            font-size:14px
            color:rgb(7,17,27)
          .desc,.extra
            line-height:10px
            font-size:10px
            color:rgb(147,153,159)     
          .desc
            margin-bottom:8px 
            line-height:12px  
          .extra
            .count
                margin-right:8px
          .price
            font-weight:700
            line-height:24px
            .now
              margin-right:18px
              font-size:14px
              color:rgb(240,20,20)
            .old
              text-decoration:line-through
              font-size:10px
              color:rgb(147,153,159)  
        .cartcontrol-wrapper
          position:absolute
          bottom:10px
          right:0                 
</style>
