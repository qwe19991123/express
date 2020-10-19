<template>
   <transition class="move">
      <div class="good-container" v-show="visible">    
      <div>
          <div class="header" v-if="good">
             <!-- 轮播图组件 -->
             <AppSwipper
               :autoPlay="false"
               :loop="false"
               :bannerList="bannerList"
             >
                <div :key="index" v-for="(url,index) in bannerList">
                    <img :src="url" alt="">
                </div>
             </appSwipper>
             <!-- 返回按钮 -->
             <i class="iconfont iconreturn" @click="handleBack"></i>
          </div>
          <div class="content" v-if="good">
            <h1>{{good.skuName}}</h1>
            <div class="price">
               <span class="now">￥{{good.salePrice}}</span>
               <span class="old">￥{{good.costPrice}}</span>
            </div>
            <div class="desc">
                {{good.skuIntroduction}}
            </div>
          </div>
          <div class="addCart-warpper">
              <div class="add-cart" @click="handleFirstAdd">
                  加入购物车
              </div>
          </div>
      </div>
      <AlertMessage
        :visible.sync="AlertMessageVisible"
        :title=AlertMsg
      />
  </div>
   </transition>
</template>

<script>
import {addCart} from '@/api'
import AppSwipper from '@/components/AppSwipper'
import AlertMessage from '@/components/AlertMessage'
export default {
    name:"GoodDetail",
    data(){
        return {
          bannerList:undefined,
          AlertMessageVisible:false,
          AlertMsg:''
        }
    },
    components:{
      AppSwipper,
      AlertMessage
    },
    props:{
        visible:{
            type:Boolean,
            default:false
        },
        good:{
            type:Object,
            default:undefined
        }
    },
    watch:{
      good(){
          this.bannerList = this.good.images.split(',');
          console.log(this.bannerList);
      }
    },
    methods:{
        handleBack(){
            this.$emit("update:visible",false)
        },
        handleFirstAdd(){
            this.AlertMessageVisible=true
            var _params = {
                skuCode:this.good.skuCode,
                businessCode:this.good.businessCode,
                loginAccount:JSON.parse(sessionStorage.getItem('loginAccount')),
                loginName:JSON.parse(sessionStorage.getItem('loginName')),
                loginPhone:JSON.parse(sessionStorage.getItem('loginPhone'))
            }
            addCart(_params).then(response=>{
                this.AlertMsg=response.msg             
            })
        }
    }

}
</script>

<style lang="scss" scoped>
  .good-container{
     position: fixed;
     top: 0;
     bottom: 0;
     left: 0;
     z-index: 1000;
     width: 100%;
     height: 100%;
     background:#eee;
     .header{
         width: 100%;
         background: #ffffff;
         img{
             margin: auto;
         }
         i{
             position: absolute;
             top: 0;
             left: 0;
             margin: 10px 0 0 10px;
             padding: .5rem;
             background: rgba($color: #000000, $alpha: .3);
             border-radius: 50%;
             color: #ffffff;
         }
     }
     .content{
         margin-top: 1rem;
         position: relative;
         background: #fff;
         padding: 1rem;
         .price{
           font-size: 0;
           text-align: left;
           .now{
               color: red;
               font-size: 1.75rem;
               font-weight: bold;
           }
           .old{
               font-size: 1rem;
               margin-left: 8px;
               text-decoration: line-through;
           }
         }
     }
     .desc{

     }
  }
  .addCart-warpper{
      position:fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background: #fff;
      height: 3.5rem;
      display: flex;
      align-items: center;
      .add-cart{
          margin: 0 auto;
          width: 200px;
          height: 2rem;
          line-height: 2rem;
          font-size: 1rem;
          border-radius: 20px;
          background: #fff;
          border: 1px solid chocolate;
          text-align: center;
          color: chocolate;
      }
  }
  .move-enter-active,.move-leave-active{
      transition: all .26s linear;
  }
  .move-enter-active,.move-leave-active{
      transform: translate(100%,0);
  }
</style>