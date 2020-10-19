<template>
  <div class="app-pwdChange" v-show="visible">
    <div class="header">
         <i class="iconfont iconreturn" @click="handleBack"></i>
         <div class="header-title">充值积分</div>
      </div>
      <div class="logo">
        <img src="@/assets/logo.png" alt="">
      </div>
      <div class="form">
        <form action="">
            <div class="msg" v-show="integralVisvble">
                  *请输入大于零的值
            </div>
          <div class="form-item">
            <span>
              <i class="iconfont iconinvite_codeinvite_code"></i>
            </span>
            <input type="text" placeholder="积分充值" v-model="integralFormData.addScore">
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
import AlertMessage from '@/components/AlertMessage'
import { updateScore } from '@/api'
// var loginAccount = JSON.parse(sessionStorage.getItem('loginAccount'))
// var userId = JSON.parse(sessionStorage.getItem('userId'))
export default {
  name:'integral',
  data(){
    return {
      integralFormData:{
        addScore:'',
        // userId:JSON.parse(sessionStorage.getItem('userId')),
        loginAccount:JSON.parse(sessionStorage.getItem('loginAccount'))
      },
      integralVisvble:false,
      AlertMessageVisible:false,
      AlertMsg:''
    }
  },
  components:{
     AlertMessage
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
        if(this.integralFormData.addScore<=0){
            this.integralVisvble=true
        }else{
         updateScore(this.integralFormData).then(response=>{
         this.AlertMessageVisible=true
         this.AlertMsg=response.msg
         this.integralFormData.addScore=''
         
          this.$parent.fetchScore();
      })
        }
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
.msg{
    color: red;
    text-align: left;
    margin-left: 40px;
    padding-bottom: 20px;
}
</style>