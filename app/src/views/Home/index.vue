<template>
    <div class="home">
        <div class="header">

       </div>
        <div class="content"> 
           <router-view/>
        </div>
        <!-- 四个主页面 -->
        <div class="nav-bar">
           <div class="item">
               <router-link class="router-item" to="hot">
                 <i class="iconfont iconhome"></i>
                 首页
               </router-link>
           </div>
           <div class="item">
               <router-link class="router-item" to="cate">
                 <i class="iconfont iconclassification"></i>
                 分类
               </router-link>
           </div>
           <div class="item">
               <router-link class="router-item" to="cart">
                 <i class="iconfont iconShopping_Cart"></i>
                 购物车
               </router-link>
           </div>
           <div class="item">
               <router-link class="router-item" to="user">
                 <i class="iconfont iconMy"></i>
                 我的
               </router-link>
           </div>
        </div>
    </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
export default {
    name: 'Home',
    components: {
        AppHeader
    }
}
</script>

<style lang="scss" scoped>
  .home{
      height: 100%;
      .header{
        height: 48px;
      }
      .content{
          height: 83.5%;
      }
      .nav-bar{
        border: 1px solid rgb(204, 204, 204);
        padding: 6px 0;
        position: fixed;
        height: 48px;
        width: 100%;
        bottom: 0;
        left: 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
          .item{
              .router-item{
                  color: rgb(90, 90, 90);
              }
              border-right: rgba($color: #aaa, $alpha: 0.5)
              flex-basis 25%;

              i{
                  display: block;
                  font-size: 1.5rem;
                  color: rgb(90, 90, 90);
              }
              a{
                  text-decoration: none;
              }
              &:last-child{
                  border: none
              }
          }
      }
  }
  // 控制菜单的样式
  .router-link-active{
      i{
        color: #c39862!important;
      }
      color: #c39862!important;
  }
</style>