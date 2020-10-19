<template>
  <div class="app-pwdChange" v-show="visible">
    <div class="header">
         <i class="iconfont iconreturn" @click="handleBack"></i>
         <div class="header-title">修改密码</div>
      </div>
      <div class="logo">
        <img src="@/assets/logo.png" alt="">
      </div>
      <div class="form">
        <form action="">
          <div class="form-item">
            <span>
              <i class="iconfont iconpwd"></i>
            </span>
            <input type="password" placeholder="旧密码" v-model="pwdFormData.originPwd">
          </div>
          <div class="form-item">
            <span>
              <i class="iconfont iconpwd"></i>
            </span>
            <input type="password" placeholder="新密码" v-model="pwdFormData.newPwd">
          </div>
          <div class="submit" @click="handleSubmit">
             确认
          </div>
        </form>
      </div>
      <AlertMessage
        :visible.sync="AlertMessageVisible"
        :title=AlertMsg
      />
  </div>
</template>

<script>
import { updatapwd,loginout } from '@/api'
import AlertMessage from '@/components/AlertMessage'
// var loginAccount = JSON.parse(sessionStorage.getItem('loginAccount'))
// var userId = JSON.parse(sessionStorage.getItem('userId'))
export default {
  name:'pwdChange',
  components:{
    AlertMessage
  },
  data(){
    return {
      pwdFormData:{
        originPwd:'',
        newPwd:'',
        // userId:JSON.parse(sessionStorage.getItem('userId')),
        userAccount:JSON.parse(sessionStorage.getItem('loginAccount')),
        isAdmin:0
      },
      AlertMessageVisible:false,
      AlertMsg:''
    }
  },
   props:{
        visible:{
            type:Boolean,
            default:false
        }
    },
  methods:{
     handleBack(){
            this.$emit("update:visible",false)
        },
    handleSubmit(){
      updatapwd(this.pwdFormData).then(response=>{
        if(response.code === 0){
          this.AlertMessageVisible=true
          this.AlertMsg=response.msg
          this.pwdFormData.originPwd=""
          this.pwdFormData.newPwd=""
        }else{
          this.AlertMessageVisible=true
          this.AlertMsg=response.msg
          loginout({
                userAccount:JSON.parse(sessionStorage.getItem('loginAccount'))
            }).then(response=>{
                var storage = window.localStorage;
                storage.clear()
                setTimeout(function(){this.$router.push("/") }.bind(this), 3000);   
            })
        }
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.app-pwdChange{
  position: fixed;
     top: 0;
     bottom: 0;
     left: 0;
     z-index: 1000;
     width: 100%;
     height: 100%;
     background: #fff;
     .header{
         background: #fff;
         height: 48px;
         i{
             margin: 5px 0 0 5px;
             float: left;
             font-size: 25px;
         }
         .header-title{
             height: 48px;
             line-height: 48px;
             text-align: center;
             margin-right: 15px;
             flex-grow: 1;
             font-size: 1.5rem;
             font-family: "微软雅黑";
             color: #c39862;
         }
     }
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
  }
}
</style>