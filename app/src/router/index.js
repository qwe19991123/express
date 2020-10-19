import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Login from '../views/Login'
import Hot from '../views/Hot'
import Cate from '../views/Cate'
import Cart from '../views/Cart'
import User from '../views/User'
import Regist from '../views/Regist'
import MyOrder from '../views/MyOrder'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/regist',
    name: 'regist',
    component: Regist
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    redirect: '/home/hot',
    children: [
      {
        path: 'hot',
        name: 'hot',
        component: Hot
      },
      {
        path: 'cate',
        name: 'cate',
        component: Cate
      },
      {
        path: 'cart',
        name: 'cart',
        component: Cart
      },
      {
        path: 'user',
        name: 'user',
        component: User
      },
      {
        path: 'myorder',
        name: 'myorder',
        component: MyOrder
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
