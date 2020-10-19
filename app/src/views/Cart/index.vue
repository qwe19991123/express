<template>
  <div class="cart">
    <div class="header">
      <AppHeader
       title="购物车"
      />
   </div>
    <!-- 列表 -->
    <div class="goods-warpper" ref="cart">
      <div class="addMsg" v-show="addMsg">
          请添加喜欢的商品到购物车
      </div>
      <ul>
        <li
         :key="index"
         v-for="(good,index) in list"
        >
        <div class="good-item" @click="handleDetail(good)">
            <div class="icon">
           <img :src="good.images.split(',')[0]" alt="">
         </div>
         <div class="content">
           <div class="name">
             {{good.skuName}}
           </div>
            <div class="datetime">
               {{good.skuIntroduction}}
            </div>
            <div class="price">
               <span style="display:block;margin-top:20px" class="now">￥{{good.salePrice}}</span>
            </div>
            <div class="control">
              <CartControl
                :good="good"
              />
            </div>
         </div>
        </div>
        <div class="delete" @click="handleDelete(good)">
            <button>删除</button>
        </div>
        </li>
      </ul>

    </div>
        <!-- 商品详情 -->
    <GoodDetail :visible.sync="GoodDetailVisible" :good="currentGood" />
     <!-- 购物车计算组件 -->
      <AccountBar
        :selectGoods="selectGoods"
        v-on:fun="change"
      />
        <AlertMessage
           :visible.sync="AlertMessageVisible"
           title='余额不足'
        />
  </div>
</template>

<script>
// var loginAccount = JSON.parse(sessionStorage.getItem('loginAccount'))
// var userId = JSON.parse(sessionStorage.getItem('userId'))
import AppHeader from '@/components/AppHeader'
import {getCart,deleteCart,getGoodBySkuCode} from '@/api'
import CartControl from '@/components/CartControl'
import AccountBar from '@/components/AccountBar'
import GoodDetail from '@/components/GoodDetail'
import AlertMessage from '@/components/AlertMessage'
import BScroll from 'better-scroll'
export default {
    components:{
      CartControl,
      AccountBar,
      AppHeader,
      GoodDetail,
      AlertMessage
    },
    data(){
      return {
        cartQueryList:{
           userId:""
        },
          list:[],
          GoodDetailVisible:false,
          currentGood:{},
          addMsg:true,
          AlertMessageVisible:false,
      }
    },
    computed:{
      selectGoods(){
        var _list = []
        
        this.list.forEach(v=>{
          if(v.shopNum > 0){
              _list.push({
                ...v,
                price:v.salePrice,
                userName:v.userName,
                phone:v.phone,
                shopNums:v.shopNum,
                userAccount : v.userAccount

              })
            }
        })
        return _list
      }
    },
    created(){
          this.getList()
    },
    methods: {
        getList(){
          // this.cartQueryList.userId = this.$store.state.userInfo.id
          var _params = {
             pageNum:1,
             pageSize:10,
             loginAccount:JSON.parse(sessionStorage.getItem('loginAccount')),
          }
           getCart(_params).then(response => {
             this.list = response.data 
             this._initScroll() 
             if(this.list.length!=0){
               this.addMsg=false
             }else{
               this.addMsg=true
             }
          })
        },
        _initScroll(){
          this.$nextTick(()=>{
            this.cartScroll = new BScroll(this.$refs.cart,{
              click:true
            })
          })
        },
        handleDetail(good){
          getGoodBySkuCode({
            skuCode: good.skuCode
          }).then(
            response => {
              this.currentGood = response.data
              this.GoodDetailVisible = true
            }
        )
        },
        handleDelete(good){
          var _params = {
              // orderUserId:userId,
              // loginAccount:loginAccount,
              skuCode:good.skuCode,
              businessCode:good.businessCode
          }
          deleteCart(_params).then(response=>{
            this.getList()         
          })
        },
        change(){
                this.AlertMessageVisible=true;
        }
    }


}
</script>

<style lang="scss" scoped>
.cart{
    position: absolute;
    top: 48px;
    left: 0px;
    right: 0px;
    bottom: 60px;
    overflow: hidden;
    background: #cccccc;
    display: flex;
    .goods-warpper{
      width: 100%;
      li{
        position: relative;
        .delete{
          position: absolute;
          top: 47px;
          right: 50px;
          button{
            color: #c39862;
            background: #fff;
            border: #c39862 1px solid;
          }
        }
      }
    }
}
.goods-warpper ul::after{
     content: '';
     display: block;
     height: 80px;
   }
.good-item{
   display: flex;
   padding:18px 18px;
   margin: 18px;
   border:1px solid #cccccc;
   border-radius: 4px;
   background: #ffffff;
   &:last-child{
     border: none;
     margin-bottom: 0;
   }
   .icon{
     flex-basis: 70px;
     margin-right: 0.75rem;
     img{
       width: 60px;
       height: 80px;
     }
   }
   .content{
     position: relative;
     flex: 1;
     text-align: left;
     .name{
       font-size: 1rem;
       font-weight: bold;
      //  height: 2.5rem;
      //  overflow: hidden;
     }
     .control{
       position: absolute;
       bottom: 0;
       right: 0;
     }
   }
}
.addMsg{
  background: #fff;
  font-size: 20px;
  margin-top: 100px;
}

</style>