<template>
   <div class="cart-control-container">
     <div class="decrease" @click.stop="decrease">
         <i class="iconfont icondown"></i>
     </div>
     <div class="count" v-show="this.good.shopNum > 0">
         {{this.good.shopNum}}
     </div>
     <div class="increase" @click.stop="increase">
         <i class="iconfont iconadd" ></i>
     </div>
   </div>
</template>

<script>
// var loginAccount = JSON.parse(sessionStorage.getItem('loginAccount'))
// var userId = JSON.parse(sessionStorage.getItem('userId'))
import { addOneCart,deleteCart,subsideCart} from '@/api'
export default {
    name:"CartControl",
    props: {
        good:{
         type:Object
        }
    },
    created(){
      
    },
    methods:{
        decrease(){
            if(this.good.shopNum===1){
                return
            }else{
                var _parma = {
                skuCode: this.good.skuCode,
                // businessCode: this.good.businessCode,
                // loginAccount:loginAccount,
                // orderUserId: "5"
                // userId:userId

            }
            subsideCart(_parma).then(
                response=>{
                   if(!this.good.shopNum){
                    this.$set(this.good,'shopNum',1)
                }else{
                    this.good.shopNum--
                }
                }
            )
            }
        },
        // 改变父级组件的数据
        increase(){
           var  _parma = {
                skuCode : this.good.skuCode,
                // shopNum : this.good.shopNum,
                // businessCode : this.good.businessCode,
                // orderUserId : userId,
                // loginAccount:loginAccount
            }
            addOneCart(_parma).then(                
                response => {
                    // 如果第一次选择商品 则没有count 计数
                    if(!this.good.shopNum){
                        this.$set(this.good,'shopNum',1)
                    }else{
                        this.good.shopNum++
                    }
                }
            )
        }
    }


}
</script>

<style lang="scss" scoped>
.cart-control-container{
    .decrease,.count,.increase{
        display: inline-block;
        padding: 6px;
        color: sandybrown;
        i{
            font-size: 1rem;
            font-weight: normal;
        }
    }
    .count{
        color: #333;
        font-size: 1rem;
    }
}
</style>