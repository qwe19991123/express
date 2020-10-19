import request from '@/utils/request'

var siteName = 'http://localhost:3000'
//获取商品分类
export function getCate(params) {
    return request({
        url: siteName+'/cateGory/findCateGoryTree',
        method: 'get',
        params
    })
} 
// 获取商品列表
export function getGoods(params) {
    return request({
        url: siteName+'/goods/listGoods',
        method: 'post',
        data: params
    })
} 

// 获取banner图
export function getBanner(params) {
    return request({
        url: siteName+'/banner/listPic',
        method: 'get',
        params
    })
} 

// 获取购物车列表
export function getCart(params) {
    return request({
        url: siteName+'/shoppingCar/findGoodsFromCar',
        method: 'get',
        params
    })
} 

// 购物车添加
export function addCart(params) {
    return request({
        url: siteName+'/shoppingCar/addshoppingCar',
        method: 'post',
        data: params
    })
} 
// 购物车删除
export function deleteCart(params) {
    return request({
        url: siteName+'/shoppingCar/deleteGoodsFromCar',
        method: 'get',
        params
    })
} 
//购物车数量减少1
export function subsideCart(params) {
    return request({
        url: siteName+'/shoppingCar/deleteOneShoppingCar',
        method: 'get',
        params
    })
} 
//购物车数量增加1
export function addOneCart(params) {
    return request({
        url: siteName+'/shoppingCar/addOneShoppingCar',
        method: 'get',
        params
    })
} 
// 创建订单/
export function createOrder(params) {
    let _data = {
        ...params,
        userName:JSON.parse(sessionStorage.getItem('loginName')),
        userAccount:JSON.parse(sessionStorage.getItem('loginAccount')),
        phone:JSON.parse(sessionStorage.getItem('loginPhone'))
    }
    return request({
        url: siteName+'/order/addOrder',
        method: 'post',
        data:_data
    })
} 
// 查询商品详情
export function getGoodBySkuCode(params) {
    return request({
        url: siteName+'/goods/findGoodsBySkuCode',
        method: 'get',
        params
    })
} 

// 用户登录
export function login(params) {
    return request({
        url: siteName+'/customer/login',
        method: 'post',
        data: params
    })
} 

// 用户注册
export function regist(params) {
    return request({
        url: siteName+'/customer/addCustomer',
        method: 'post',
        data: params
    })
} 

// 获取订单列表
export function getOrderList(params) {
    return request({
        url: siteName+'/order/listOrders',
        method: 'get',
        params
    })
} 

// 登出
export function loginout(params) {
    return request({
        url: siteName+'/customer/loginOut',
        method: 'get',
        params
    })
} 

// 修改密码
export function updatapwd(params) {
    return request({
        url: siteName+'/customer/updatePwd',
        method: 'get',
        params
    })
} 
//积分充值
export function updateScore(params) {
    return request({
        url: siteName+'/customer/updateCustomerScore',
        method: 'get',
        params
    })
} 

//积分显示
export function showScore(params) {    
    return request({
        url: siteName+'/customer/showScore',
        method: 'get',
        params
    })
} 