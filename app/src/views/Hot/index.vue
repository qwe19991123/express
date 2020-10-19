<template>
  <div class="hot">
    <div class="header">
      <AppHeader title="首页" />
    </div>
    <div class="scroll" ref="hot">
      <div>
                <div v-if="bannerList" class="banner">
        <!-- 轮播的组件 -->
        <AppSwipper>
          <div :key="index" v-for="(item,index) in bannerList" :bannerList="bannerList">
            <img :src="item.images" alt="图片不见了">
          </div>
        </AppSwipper>
      </div>
      <!-- 下方列表 -->
      <div class="good-list">
        <div class="title">
          热门商品
        </div>
        <div class="container">
          <div class="card" :key="index" v-for="(good,index) in goodsList" @click="handleGoodDetail(good)">
            <img :src="good.images.split(',')[0]" alt="">
            <div class="name">
              {{good.skuName}}
            </div>
            <div class="price">
              ￥{{good.salePrice}}
              <s>￥{{good.costPrice}}</s>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
    <!-- 商品详情 -->
    <GoodDetail :visible.sync="GoodDetailVisible" :good="currentGood" />
  </div>
</template>

<script>
  import AppHeader from '@/components/AppHeader'
  import {
    getBanner,
    getGoods,
    getGoodBySkuCode
  } from '@/api'
  import AppSwipper from '@/components/AppSwipper'
  import GoodDetail from '@/components/GoodDetail'
  import BScroll from 'better-scroll'
  export default {
    name: "banner",
    components: {
      AppSwipper,
      GoodDetail,
      AppHeader
    },
    data() {
      return {
        bannerList: undefined,
        bannerQueryList: {
          "picStatus": "1",
          "pageNum": "1",
          "pageSize": "100"
        },
        GoodsQueryList: {
          "pageNum": "1",
          "pageSize": "100"
        },
        goodsList: [],
        //商品详情
        GoodDetailVisible: false,
        currentGood: {}

      }
    },
    created() {
      //获取轮播图
      this.getBannerData()
      //获取商品列表滚动
      this.getGoodsData()
      //滚动
      this._initScroll()
    },
    methods: {
      getBannerData() {
        getBanner(this.bannerQueryList).then(response => {
          this.bannerList = response.data
        })
      },
      getGoodsData() {
        getGoods(this.GoodsQueryList).then(response => {
          this.goodsList = response.data.list
        })
      },
      _initScroll() {
        this.$nextTick(() => {
          this.glScroll = new BScroll(this.$refs.hot,{
            click: true,
            ScrollY: true
          })
        })
      },
      handleGoodDetail(good) {
        getGoodBySkuCode({
          skuCode: good.skuCode
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
  .hot {
    position: absolute;
    top: 48px;
    left: 0px;
    right: 0px;
    bottom: 60px;
    overflow: hidden;
    
   .scroll{
     height: 630px;
     overflow: hidden;
      .banner {
      width: 100%;
    }

    .good-list {
      background: #f6f6f6;;
      .title {
        padding: 5px 25px;
        text-align: left;
        font-size: 1rem;
        height: 2rem;
        line-height: 2rem;
        color: #c39862;
      }

      .container {
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0 1rem;

        .card {
          background: #fff;
          margin-bottom: 1rem;
          border-radius: 10px;
          padding: 1rem 0;
          width: 11.5rem;
          height: 160px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          .price{
            color: red;
            font-size: 20px;
            display: flex;
            justify-content: left;
            width: 100%;
            margin-left: 20px;
            s{
              display: flex;
              align-items: center;
              margin-left: 10px;
              font-size: 10px;
              color:rgb(225, 225, 225)
            }
          }
          img {
            width: 100px;
            height: 100px;
          }
        }
      }
    }
   }
  }
</style>