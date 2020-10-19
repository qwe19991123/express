<template>
  <div class="user-warpper">
    <div class="header">
      <AppHeader
       title="个人中心"
      />
   </div>
      <div class="user-header">
         <img src="https://tse3-mm.cn.bing.net/th/id/OIP.aZnj3_rbNh6p6VILEOuAUAAAAA?pid=Api&rs=1" alt="">
         <h3>Cayla Brister</h3>
      </div>
      <div class="myscore">剩余积分:<span>{{this.myscore}}</span></div>
      <div class="content">
         <div class="item" @click="handleOrder">
             <i class="iconfont iconorder"></i>
             <h4>我的订单</h4>
             <i class="iconfont iconxiangqing"></i>
         </div>
         <div class="item" @click="handleVisible">
             <i class="iconfont iconchange_pwd"></i>
             <h4>修改密码</h4>
             <i class="iconfont iconxiangqing"></i>
         </div>
         <div class="item" @click="handleaddIntegralVisible">
             <i class="iconfont iconinvite_codeinvite_code"></i>
             <h4>充值积分</h4>
             <i class="iconfont iconxiangqing"></i>
         </div>
         <div class="item" @click="handleLogout">
             <i class="iconfont iconSign_out"></i>
             <h4>退出登录</h4>
         </div>
      </div>
      <pwdChange 
       :visible.sync = "pwdChangeVisible"
      />
      <AddIntegral
      :visible.sync = "addIntegralVisible"
       />
  </div>
</template>

<script>
// var loginAccount = JSON.parse(sessionStorage.getItem('loginAccount'))
// var userId = JSON.parse(sessionStorage.getItem('userId'))
import pwdChange from '@/components/pwdChange'
import AppHeader from '@/components/AppHeader'
import AddIntegral from '@/components/AddIntegral'
import {loginout,showScore} from '@/api'
export default {
    name:'user',
    components: {
        AppHeader,
        pwdChange,
        AddIntegral
    },
    data(){
        return {
          pwdChangeVisible:false,
          addIntegralVisible:false,
          myscore:''
        }
    },
    created(){
        this.fetchScore()
    },
    methods:{
        handleVisible(){
            this.pwdChangeVisible = true
        },
        handleOrder(){
            this.$router.push("./myorder")
        },
        handleLogout(){
            loginout({
                id:JSON.parse(sessionStorage.getItem('userId')),
                isAdmin:0
            }).then(response=>{
                var storage = window.localStorage;
                storage.clear()
                this.$router.push("/")
            })
        },
        handleaddIntegralVisible(){
            this.addIntegralVisible = true
        },
        fetchScore(){
             var _params={
            loginAccount:JSON.parse(sessionStorage.getItem('loginAccount'))
            }
            showScore(_params).then(response=>{
                this.myscore=response.data[0].frontScore
            })
        }
    }

}
</script>

<style lang="scss" scoped>
.user-warpper{
    height: 100%;
    background: rgb(246, 246, 246);
}
 .user-header{
     width: 100%;
     height: 110px;
     display: flex;
     align-items: center;
     justify-content: center;
     img{
         height: 70px;
         width: 70px;
         border-radius: 40px;
     }
     h3{
         font-size: 25px;
         margin-left: 20px;
     }
 }
 .myscore{
     margin-bottom: 20px;
     font-weight: bold;
     margin-left: 2rem;
     font-size: 18px;
     span{
         font-size: 25px;
         margin-left: 20px;
         color:  chocolate;
     }
 }
 .content{
     box-sizing: border-box;
     background: #fff;
     margin: 0 10px;
     height: 260px;
     border-radius: 10px;
     display: flex;
     padding: 30px 10px;
     flex-direction: column;
     justify-content: space-around;
     .item{
       display: flex;
       .iconxiangqing{
           flex: 1;
           text-align: right;
       }
       h4{
           height: 22;
           line-height: 22px;
           margin-left: 5px;
       }
       i{
           color: #c39862;
       }
     }
 }
</style>