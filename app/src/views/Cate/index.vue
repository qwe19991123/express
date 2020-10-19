<template>
  <div class="goods">
    <div class="header">
      <AppHeader
       title="商品分类"
      />
   </div>
     <div class="menu-warpper" ref="mw">
       <ul>
         <li
          :key="index"
          v-for="(item,index) in goods"
          class="menu-item"
          :class="{'current':currentIndex === index}"
          @click="handleSelect(item,index,$event)"
         >
          <span class="text">{{item.cateName}}</span>
         </li>
       </ul>
     </div>
     <div class="goods-warpper" ref="gw">
       <ul>
         <li
          :key="index"
          v-for="(item,index) in goods"
          class="goods-list"
          ref="goodList"
          @click="handleGoodDetail(item)"
         >
         <h1 class="title">{{item.cateName}}</h1>
          <ul>
            <!-- 没有商品提示 -->
            <!-- <div v-if="item.goods.length === 0">
              <span>此分类没有上架的书籍，敬请期待。。。</span>
            </div> -->
            <li
             :key="index"
             v-for="(cate,index) in item.data"
            >
            <h2 class="title">{{cate.secondCateName}}</h2>
              <ul>
                <li :key="index"
                v-for="(good,index) in cate.goods"
                @click="handleSelectGood(good,$event)"
                style="display:flex;margin:20px;">
                <div>
                    <img style="height:100px;width:100px" :src="good.images" alt="">
                </div>
                <div style="width:50%">
                    <h3 style="text-align:center">{{good.skuName}}</h3>
                    <p style="text-align:center"><span style="color:red">￥{{good.salePrice}}</span><s>￥{{good.costPrice}}</s></p>
                </div>
                </li>
              </ul>
            </li>
          </ul>

         </li>
       </ul>
     </div>
         <!-- 商品详情 -->
    <GoodDetail :visible.sync="GoodDetailVisible" :good="currentGood" />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import { getCate, getGoods,getGoodBySkuCode } from '@/api'
import BScroll from 'better-scroll'
import GoodDetail from '@/components/GoodDetail'
export default {
  name: 'cate',
     components: {
        AppHeader,
        GoodDetail
    },
  data() {
      return {
        // 处理后的数据格式
        goods:[],
         goodsQueryList: {
           pageNum: '1',
           pageSize: '100'
         },
         // 商品类别数据备份
         cateList: [],
         goodList: [],
         // 类别索引
        //  currentIndex: 0,
         scrollY:0,
         listHeight:[],
         //商品详情
          GoodDetailVisible: false,
          currentGood: {},
          //分类
          cateCode:'',
          skuCode:''
      }
  },
  computed:{
    currentIndex(){
      // 动态计算商品类别
      for(var i=0;i<this.listHeight.length;i++){
        var h1 = this.listHeight[i]
        var h2 = this.listHeight[i+1]
        if(!h2 || this.scrollY >= h1 && this.scrollY < h2){
          return i
        }
      }
      return 0
    }
  },
  created() {
    this._otherinitData()
    this._initScroll()  
  },
  methods: {
    //没有商品的分类不进行展示
    _otherinitData() {
      getGoods(this.goodsQueryList).then(response=>{
        //第一分类去重->第二分类去重->第二分类放在第一分类之下->遍历商品归类到指定分类下
        //构造商品类别数组并去重
          var A_cateList = [];
          response.data.list.forEach(item=>{
            A_cateList.push(item.firstCateName)
          })
        //去重并转换为对象
          A_cateList = [...new Set(A_cateList)].map(code=>{
            return {
              cateName:code,
              data:[]
            }
          })
        //将第二分类归类到第一分类,并转化为对象
         this.data = response.data.list.reduce((acc,cur) =>{
          for(var i=0;i<acc.length;i++){
            //如果已经有了 就添加到goods数组里面
            if(acc[i].cateName == cur.firstCateName&&acc[i].data[i]!=cur.secondCateName){
              acc[i].data.push(cur.secondCateName) 
              continue
            }
          }
          return acc
        },A_cateList)
        //第二分类转化为对象
        for(var j=0;j<this.data.length;j++){
          this.data[j].data = [...new Set(this.data[j].data)].map(code=>{
            return {
                secondCateName:code,
                goods:[]
            }
          })
          
        //逐个将商品归类到指定分类下
        this.goods = response.data.list.reduce((acc,cur) =>{
          for(var i=0;i<acc.length;i++){
            //如果已经有了 就添加到goods数组里面
            if(acc[i].secondCateName == cur.secondCateName){
              acc[i].goods.push(cur)
              continue
            }
          }
          return acc
        },this.data[j].data)
        }
         // 在渲染之后计算每个商品的高度
         this.heightCalculation()
         this.goods=this.data
         console.log(A_cateList);
      })
    },
    //启动滚动插件
    _initScroll() {
      this.$nextTick(()=>{
        // 初始化实例
        //菜单
      this.menuScroll = new BScroll(this.$refs.mw,{
          click:true
      })    
      // 商品的滚动
      this.goodScroll = new BScroll(this.$refs.gw,{
        click:true,
        // 实时监听滚动位置
        probeType:3
      })
      // 监听滚动事件
      this.goodScroll.on('scroll',(pos)=>{
          // 记录每次滚动的y值
          this.scrollY = Math.abs(pos.y)
      })  
    })
   },
   handleSelect(item,index,event){
     //消除pc端的重复点击事件
     if(event._constracted){
       return
     }
     //找到当前的dom
     var _el = this.$refs.goodList[index]
     //使用bs进行滚动
     this.goodScroll.scrollToElement(_el,500)
     
   },
   handleSelectGood(good){
      this.skuCode = good.skuCode      
   },
   //每个商品高度计算
   heightCalculation(){
     this.$nextTick(()=>{
       //获取当前good的高度
       var DOM_goodList = this.$refs.goodList  
       // 第一个高度是0
       var height = 0
       this.listHeight.push(height)
       for(var i =0;i<DOM_goodList.length;i++){
         height += DOM_goodList[i].clientHeight 
         this.listHeight.push(height)
       }
       
     })
   },
   handleGoodDetail(item){
          // 获取分类编码
     this.cateCode = item.cateCode
     
     getGoodBySkuCode({
          skuCode: this.skuCode,
          frontCateCode: this.cateCode
        }).then(          
          response => {
            this.currentGood = response.data[0]
            this.GoodDetailVisible = true
          }
        )
   }
  }
}
</script>

<style lang="scss" scoped>  
 .goods{
   display: flex;
   position: absolute;
   width: 100%;
   top: 48px;
   left: 0;
   bottom: 58px;
   overflow: hidden;
   .menu-warpper{
     flex: 0 0 0 80px;
     background: #fff;
     .menu-item{
       box-sizing: border-box;
       text-align: left;
       width: 92px;
       height: 54px;
       line-height: 1rem;
       font-size: 1rem;
       padding: 0 0 0 8px;
       display: table;
       .text{
         padding-left: 0.5rem;
         display: table-cell;
         width: 100%;
         font-size: 1rem;
         vertical-align: middle;
       }
       // 当前选中
       &.current{
         color: #c39862;
         background:#f6f6f6 ;
         z-index: 9;
         margin-top: -1px;
       }
     }
   }
   .goods-warpper{
     background: rgb(246, 246, 246);
     width: 100%;
     flex: 1;
     box-sizing:border-box ;
     height: 630px;
     ul{
       background: #fff;
       width: 90%;
       margin: 0 auto;
     }
     .title{
       border: none;
       height: 54px;
       line-height: 54px;
       font-size: 1rem;
       text-align: left;
       padding-left: 10px;
       color: rgb(180, 180, 180);
       font-weight: normal;
       background: #f6f6f6;
      
     }
      .goods-item{
         display: flex;
         padding: 8px 0;
        //  border-bottom: #333 1px solid;
         margin:20px 0;
         &:last-child{
           border: none;
         }
         .icon {
           margin-left: 1rem;
           img{
             width: 100px;
             height: 100px;
           }
         }
         .content{
           flex-grow: 1;
           padding:0 1rem;
           height: 100px;
           .name{
             margin-bottom:8px ;
             font-size: 1rem;
             height: 1rem;
             line-height: 1rem;
             overflow: hidden;
            //  white-space: nowrap;
           }
           .desc{
            max-height: 50px;
            overflow: hidden;
            word-wrap: break-word;
            word-break: break-word;
            text-overflow: ellipsis;
            text-align: left;
            line-height: 1rem;
            font-size: 12px;
            opacity: 0.7;
           }
           .price{
             text-align: left;
             font-size: 16px;
             .now{
               display: inline-block;
               margin-right: 8px;
               font-size: 1.25rem;
               color: red;
               height: 31px;
               line-height: 31px;
             }
             .old{
               display: inline-block;
               text-decoration: line-through;
               opacity: 0.7;
               font-size: 10px;
               height: 31px;
               line-height: 31px;
             }
             .saleNum{
               display: inline-block;
               height: 31px;
               line-height: 31px;
               margin-left: 4px;
             }
           }
         }
       }
   }
 }
</style>