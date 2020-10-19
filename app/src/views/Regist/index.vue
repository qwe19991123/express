<template>
  <div class="regist-warpper">
    <div class="header">
     <AppHeader 
      title="注册"
      :hiddenBack="false"
     />
    </div>
      <div class="logo">
        <img src="@/assets/logo.png" alt="">
      </div>
      <div class="form">
        <form action="">
          <div class="form-item">
            <input type="radio" name="sex" value="1" id="male">
            <div>
               <label @click="handleSexChange" class="male" :class="{'current': this.sexSelect == 1}" for="male">♂</label>
               <p :class="{'current1': this.sexSelect == 1}">男</p>
            </div>
            <div>
               <label @click="handleSexChange1" class="female" :class="{'current': this.sexSelect == 0}" for="female">♀</label>
               <p :class="{'current1': this.sexSelect == 0}">女</p>
            </div>
            <input type="radio" name="sex" value="2" id="female">
          </div>
          <div class="msg-item" v-show="userAccountMsg">*请输入大于6位的用户名</div>
          <div class="form-item">
            <span>
              <i class="iconfont iconusername"></i>
            </span>
            <input type="text" placeholder="用户名" v-model="registDataTemp.userAccount">
          </div>
          <div class="msg-item" v-show="pwdMsg">*请输入大于6位的密码</div>
          <div class="form-item">
            <span>
              <i class="iconfont iconpwd"></i>
            </span>
            <input type="password" placeholder="密码" v-model="registDataTemp.password">
          </div>
          <div class="msg-item" v-show="isPwdMsg">*请再输入一次密码</div>
          <div class="form-item">
            <span>
              <i class="iconfont iconConfirm_pwd"></i>
            </span>
            <input type="password" placeholder="确认密码" v-model="registDataTemp.isPassword">
          </div>
          <div class="msg-item" v-show="phoneMsg">*请输入本人手机号</div>
          <div class="form-item">
            <span>
              <i class="iconfont iconphone"></i>
            </span>
            <input type="text" placeholder="手机号" v-model="registDataTemp.phone">
          </div>
          <div class="form-item">
            <span>
              <i class="iconfont iconname"></i>
            </span>
            <input type="text" placeholder="姓名" v-model="registDataTemp.userName">
          </div>
          <div class="msg-item" v-show="isCardMsg">*请输入本人身份证</div>
          <div class="form-item">
            <span>
              <i class="iconfont iconid"></i>
            </span>
            <input type="text" placeholder="身份证号" v-model="registDataTemp.idCard">
          </div>
          <div class="regist" @click="handleRegist">
             注册
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
import AppHeader from '@/components/AppHeader'
import AlertMessage from '@/components/AlertMessage'
import { regist } from '@/api'
export default {
  name:'regist',
  components:{
    AppHeader,
    AlertMessage
  },
  data(){
    return {
      registDataTemp:{
        userAccount:'',
        userName:'',
        userSex:'',
        phone:'',
        idCard:'',
        password:'',
        frontScore:'0',
        isAdmin:0,
        isPassword:''
      },
      sexSelect: 1,
      userAccountMsg:false,
      pwdMsg:false,
      isPwdMsg:false,
      phoneMsg:false,
      userNameMsg:false,
      isCardMsg:false,
      AlertMessageVisible:false,
      AlertMsg:""
    }
  },
  methods:{
    handleSexChange(){
        this.sexSelect = 1  
    },
    handleSexChange1(){
        this.sexSelect = 0  
    },
    handleRegist(){
      if(this.registDataTemp.userAccount.length<6){
        this.userAccountMsg=true
      }
      if(this.registDataTemp.userAccount.length>=6){
        this.userAccountMsg=false
      }
      if(this.registDataTemp.password.length<6){
        this.pwdMsg=true
      }
      if(this.registDataTemp.password.length>=6){
        this.pwdMsg=false
      }
      if(this.registDataTemp.isPassword!=this.registDataTemp.password){
        this.isPwdMsg=true
      }
      if(this.registDataTemp.isPassword==this.registDataTemp.password){
        this.isPwdMsg=false
      }
      if(this.registDataTemp.phone.length!=11){
        this.phoneMsg=true
      }
      if(this.registDataTemp.phone.length==11){
        this.phoneMsg=false
      }
      if(this.registDataTemp.idCard.length!=18){
        this.isCardMsg=true
      }
      if(this.registDataTemp.idCard.length==18){
        this.isCardMsg=false
      }
      if(this.userAccountMsg==false&&this.pwdMsg==false&&this.isPwdMsg==false&&this.phoneMsg==false&&this.isCardMsg==false){
         this.registDataTemp.userSex=this.sexSelect
         regist(this.registDataTemp).then(response =>{
           this.AlertMsg=response.msg
           
            this.AlertMessageVisible=true
         this.registDataTemp.userAccount = '',
         this.registDataTemp.userName = '',
         this.registDataTemp.password = '',
         this.registDataTemp.phone = '',
         this.registDataTemp.idCard = '',
         this.registDataTemp.isPassword = ''
       })
      }
    }

 }
}
</script>

<style lang="scss" scoped>
.regist-warpper{
  height: 100%;
  padding: 1rem;
  .logo{
    width: 100%;
    height: 150px;
    img{
      position: absolute;
      left: 0;
      top: 40px;
      //图片自适应
      width: auto;
      height: auto;
      max-width: 80%;
      max-height: 80%;
      margin-left: 10%;
    }
  }
  .form{
     .msg-item{
       text-align: left;
       margin-left: 70px;
       color: red;
     }
     .form-item{
       display: flex;
       justify-content: space-between;
       border-bottom:solid 1px #cccccc ;
       margin: 0 20px 0.7rem 20px;
       padding: 0 20px 0.5rem 20px;
       flex-wrap: wrap;
       i{
         color: #c99f69;
         font-weight: bold;
       }
       input{
         flex: 1;
         margin-left: 1rem;
         border: none;
         outline:medium;
       }
       input[type="radio"]{
         visibility: hidden;
         width: 0;
       }
       .male{
         display: inline-block;
         font-size: 1.5rem;
         color: #fff;
         width: 100px;
         height: 35px;
         background:#cccccc;
       }
       .female{
         display: inline-block;
         font-size: 1.5rem;
         color: #fff;
         width: 100px;
         height: 35px;
         background: #cccccc;
       }
       p{
         width: 100%;
         margin-top: 10px;
       }
       &:first-child{
         border: none;
       }
       .current{
         background: #c39862;
       }
       .current1{
         color: #c39862;
       }
     }
     .regist{
       margin:40px 10px 20px;
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