<template>
  <div class="account-bar-warpper">
      <div class="left">
          <!-- 购物车图标 -->
          <div class="logo-warpper">
              <div class="logo" :class="{'active':total.num !== 0}">
                  <i class="iconfont iconShopping_Cart"></i>
              </div>
              <!-- 显示最终数量 -->
              <div class="num" v-show="total.num !== 0">
                 {{total.num}}
              </div>
          </div>
          <!-- 总价 -->
          <div class="price">
              ￥{{total.price}}
          </div>
          <!-- 内容描述 -->
          <div class="content">
             实际价格以订单为准
          </div>
      </div>
      <div class="right">
          <div class="pay" :class="{'active':total.price > 0}" @click="handleAddOrder">
             结算
          </div>
      </div>
  </div>
</template>

<script>
var loginAccount = JSON.parse(sessionStorage.getItem('loginAccount'))
var userId = JSON.parse(sessionStorage.getItem('userId'))
import {createOrder} from '@/api'
export default {
    name:'AccountBar',
    data(){
       return {
       }
    },
    props:{
        selectGoods:{
            type:Array,
            default(){
                return[]
            }
    }
   },
    computed:{
        // 计算总价格和数量
        total(){
          var _total = this.selectGoods.reduce((acc,cur)=>{
             acc.price += cur.price*cur.shopNum
             acc.num += cur.shopNum
             return acc
          },{
              price:0,
              num:0
          })
          if(_total.price == 0){
              _total.content = '请添加商品到购物车'
          }else{
              _total.content = '结算'
          }
          return _total
        }
    },
    methods:{
        handleAddOrder(){
            // var A_orderVas = this.selectGoods.map(v=>{
            //     return {
            //         skuCode:v.skuCode,
            //         businessCode:v.businessCode,
            //         userId:"5",
            //         shopNums:v.shopNums
            //     }
            // })
            // var _params={
            //     skuCode:A_orderVas[0].skuCode,
            //     businessCode:A_orderVas[0].businessCode,
            //     shopNum:A_orderVas[0].shopNums,
            //     loginAccount:loginAccount
            // }
            let _params = {
              ...this.selectGoods,
              id:userId,
              frontScore:this.total.price
            }
            createOrder(_params).then(
                response=>{      
                    if(response.code===500){
                         this.$emit('fun','子组件修改了')
                    }else{
                        this.$router.push("./myorder")
                    }
                }
            )
        }
    }
}
</script>

<style lang="scss" scoped>
 .account-bar-warpper{
     position: absolute;
     bottom: 0;
     left: 0;
     width: 100%;
     height: 46px;
     display: flex;
     justify-content: space-around;
     background: #eee;
     .left{
         flex-grow: 1;
         display: flex;
         align-items: center;
         font-size: 0;
         .logo-warpper{
             margin-left: 1.75rem;
             box-sizing: border-box;
             position: relative;
             top: -10px;
             width: 56px;
             height: 56px;
             padding: 6px;
             border-radius: 50%;
             background: #eee;
             .logo{
                 background: rgb(59,72,80);
                 border-radius: 50%;
                 height: 100%;
                 width: 100%;
                 text-align: center;
                 &.active{
                     background: coral;
                 }
                 .icon-cart{
                     font-size: 24px;
                     color: #eee;
                     line-height: 36px;
                 }
             }
             .num{
                 position: absolute;
                 top: 0;
                 right: 0;
                 height: 16px;
                 width: 24px;
                 line-height: 16px;
                 text-align: center;
                 background: crimson;
                 border: radius 4px;
                 color: #fff;
                 font-size: 10px;
                 box-shadow: 0 2px 4px 0 rgb(100,98,98);
             }
         }
         .price{
             max-width: 100px;
             padding-right: 12px;
             box-sizing: border-box;
             font-size: 1.5rem;
             font-weight: bold;
             columns: red;
             border-right:1px rgba($color: #000000, $alpha: .3)
         }
         .content{
             flex-grow: 1;
             padding-left: 8px;
             font-size: 10px;

         }
     }
     .right{
         width: 100px;
         flex-basis: 100px;
         .pay{
             height: 100%;
             width: 100%;
             background: rgb(128, 121, 121);
             display: flex;
             justify-content: center;
             align-items: center;
             &.active{
                 background: chocolate;
                 color: #fff;
             }
         }
     }
 }
</style>