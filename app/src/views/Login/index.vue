<template>
  <div class="app-login">
      <div class="logo">
        <img src="@/assets/logo.png" alt="">
      </div>
      
      <div class="form">
        <form action="">
          <div class="form-item">
            <span>
              <i class="iconfont iconusername"></i>
            </span>
            <input type="text" placeholder="用户名" v-model="loginFormData.userAccount">
          </div>
          <div class="form-item">
            <span>
              <i class="iconfont iconpwd"></i>
            </span>
            <input type="password" placeholder="密码" v-model="loginFormData.password">
          </div>
          <div class="submit" @click="handleSubmit">
             登录
          </div>
          <div class="regist">
             <router-link to="regist">
                 注册
             </router-link>
          </div>
        </form>
      </div>
      
      <AlertMessage
       :visible.sync="AlertMessageVisible"
       title="账号或密码错误"
       content="请输入正确的账号和密码"
        />
  </div>
</template>

<script>
import AlertMessage from '@/components/AlertMessage'
export default {
  name:'login',
  data(){
    return {
      loginFormData:{
        userAccount:'',
        password:'',
        isAdmin:'0'
      },
      AlertMessageVisible:false
    }
  },
  components:{
     AlertMessage
  },
  methods:{
    handleSubmit(){
         this.$store.dispatch('login',this.loginFormData).then(
        response=>{
          // 在这里不用判断状态啥的，只要能走到这个方法一定是成功的
          if(response.success == true){
            this.$router.push("./home")
          }else{
            this.AlertMessageVisible=true
          }
        }
      )
    },

  }

}
</script>

<style lang="scss" scoped>
.app-login{
  height: 100%;
  padding: 2rem;
  .logo{
    width: 100%;
    position: relative;
    // 由于图片的宽度是动态计算的 所以需要预先测定高度，把空间预留出来
    padding-top: 100%;
    img{
      position: absolute;
      left: 0;
      top: 100px;
      //图片自适应
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
    }
  }
  .form{
     .form-item{
       display: flex;
       justify-content: space-between;
       border-bottom:solid 1px #cccccc ;
       margin: 0 20px 2rem 20px;
       padding: 0 20px 0.5rem 20px;
       i{
         color: coral;
         font-weight: bold;
       }
       input{
         flex: 1;
         margin-left: 1rem;
         border: none;
         outline:medium;
       }
     }
     .submit{
       margin:60px 10px 20px;
       background: linear-gradient(to right,#e8c190,#c99f69);
       height: 2.5rem;
       line-height: 2.5rem;
       font-size: 20px;
       color: #fff;
       font-weight: bolder;
       border-radius: 6px;
     }
     .regist{
       text-align: right;
       margin: 20px;
       font-size: 1rem;
       a{
         color: darkgray;
         text-decoration: none;
       }
     }
  }
}
</style>