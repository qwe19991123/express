<template>
    <div class="order-warpper">
        <div class="header">
            <i class="iconfont iconreturn" @click="handleBack"></i>
            <div class="header-title">我的订单</div>
        </div>
        <nav class="nav">
            <p><span class="all-order nav-item">全部订单</span></p>
        </nav>
        <div class="content" ref="content">
            <ul>
                <li class="order-item" :key="index" v-for="(item,index) in this.list" @click="handleDetail(item)">
                        <div class="item-header">
                            <i class="iconfont iconorder"></i>
                            <span class="orderCode">{{item.orderCode}}</span>
                            <span class="payStatus">{{item.payStatus | payStatusFilter}}</span>
                        </div>
                        <div class="item-content">
                            <div>
                                <img :src="item.images.split(',')[0]" alt="">
                            </div>
                            <div style="width:230px">
                                <p class="skuName">{{item.skuName}}</p>
                                <s class="one">￥{{item.salePrice}}</s>
                                <p class="orderIfo">
                                    共<span class="shopNum">{{item.shopNum}}</span>件商品,
                                    总价:<span class="all">￥{{item.salePrice * item.shopNum}}</span>
                                </p>
                            </div>
                        </div>
                </li>
                <div style="height:50px"></div>
            </ul>
        </div>
        <!-- 商品详情 -->
        <GoodDetail :visible.sync="GoodDetailVisible" :good="currentGood" />
    </div>
</template>

<script>
    // var loginAccount = JSON.parse(sessionStorage.getItem('loginAccount'))
    // var userId = JSON.parse(sessionStorage.getItem('userId'))
    import BScroll from 'better-scroll'
    import GoodDetail from '@/components/GoodDetail'
    import {
        getOrderList,
        getGoodBySkuCode
    } from '@/api'
    export default {
        name: 'myorder',
        data() {
            return {
                list: [],
                GoodDetailVisible: false,
                currentGood: {}
            }
        },
        components: {
            GoodDetail
        },
        created() {
            this.fetchData()
            this._initScroll()
        },
        methods: {
            handleBack() {
                this.$router.push("./user")
            },
            fetchData() {
                var _parmas = {
                    loginAccount: JSON.parse(sessionStorage.getItem('loginAccount')),
                    isAdmin:0
                    // orderUserId: +JSON.parse(sessionStorage.getItem('userId'))
                }
                getOrderList(_parmas).then(response => {
                    this.list = response.data.list
                })
            },
            _initScroll() {
                this.$nextTick(() => {
                    this.contentScroll = new BScroll(this.$refs.content, {
                        click: true,
                        ScrollY: true
                    })
                })
            },
            handleDetail(item) {
                var _params = {
                    skuCode: item.skuCode
                }
                getGoodBySkuCode(_params).then(response => {
                    this.GoodDetailVisible = true
                    this.currentGood = response.data
                })
            }
        },
        filters: {
            payStatusFilter(code) {
                return ["未支付", "已支付", "退款中", "已退款"][code]
            }
        }

    }
</script>

<style lang="scss" scoped>
    .order-warpper {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 1000;
        width: 100%;
        height: 100%;
        background: #eee;

        .header {
            background: #fff;
            height: 48px;

            i {
                margin: 5px 0 0 5px;
                float: left;
                font-size: 25px;
            }

            .header-title {
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

        .nav {
            height: 80px;
            background: #f6f6f6;

            .nav-item {
                height: 76px;
                box-sizing: border-box;
                font-size: 10px;
                padding: 0 15px;
                float: left;
                line-height: 76px;
                font-weight: bold;
            }

            .all-order {
                color: #c39862;
                font-size: 15px;
                padding: 0 15px;
            }

        }

        .content {
            height: 100%;
            background: #f6f6f6;
            height: 37rem;
            overflow: hidden;

            .order-item {
                margin: 0 1rem;
                background: #fff;
                border-radius: 10px;
                margin-bottom: 20px;

                .item-header {
                    display: flex;
                    justify-content: left;
                    padding-top: 20px;

                    .iconorder {
                        color: #c39862;
                        font-weight: bold;
                        font-size: 18px;
                        margin-left: 10px;
                    }

                    .orderCode {
                        font-size: bold;
                        color: #000;
                        display: inline-block;
                        font-size: 17px;
                        height: 25px;
                        line-height: 25px;
                        margin-left: 10px;
                    }

                    .payStatus {
                        display: inline-block;
                        height: 25px;
                        line-height: 25px;
                        color: #c39862;
                        margin-left: 110px;

                    }
                }

                .item-content {
                    display: flex;
                    img {
                        width: 100px;
                        height: 100px;
                        margin: 20px;
                    }

                    .skuName {
                        font-size: 1rem;
                        margin-top: 20px;
                    }

                    .one {
                        display: block;
                        color: red;
                        margin: 20px 0 0 0;
                        text-align: right;
                    }

                    .orderIfo {
                        font-size: 1rem;
                        margin: 20px 0 20px 0;
                        text-align: right;


                        .all {
                            font-size: 1.5rem;
                        }
                    }
                }
            }
        }
    }
</style>