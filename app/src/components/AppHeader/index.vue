<template>
  <div class="app-header">
      <div class="header-left" @click="handleBack" :class="{hidden : hiddenBack}">
          <i class="iconfont iconreturn"></i>
      </div>
      <div class="header-title">{{title}}</div>
      <div class="header-right" :class="{hidden : hiddenExtend}">更多</div>
  </div>
</template>

<script>
export default {
    name: "AppHeader",
    props: {
        title: {
            type: String,
            default: "首页"
        },
        hiddenBack: {
            type: Boolean,
            default: true
        },
        hiddenExtend: {
            type: Boolean,
            default: true
        }
    },
    methods:{
      handleBack(){
          this.$router.push({path: '/'})
      }
    }

}
</script>

<style lang="scss" scoped>
    .app-header{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      //一般来说 header是不会自适应改变高度的
      height: 48px;
      // 父级字体设为0，这样避免空格占有宽度影响布局
      font-size: 0;
      //felx布局
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .header-left{
        flex-basis: 40px;
        width: 40px;
        font-size: 20px;
        i{
            font-size: 20px;
        }
      }
      .header-title{
        flex-grow: 1;
        font-size: 1.5rem;
        font-family: "微软雅黑";
        color: #c39862;
      }
      .header-right{
        width: 40px;
        flex-basis: 40px;
      }
    }
    // 隐藏组件
    .hidden{
      visibility: hidden;
    }
</style>