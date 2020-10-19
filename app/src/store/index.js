import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import {login} from "@/api"
export default new Vuex.Store({
  state: {
    userInfo:{}
  },
  mutations: {
    SET_USER:(state,data)=>{
      Object.assign(state.userInfo,data)
    }
  },
  actions: {
    login({commit},userInfo){
      return new Promise((resolve,reject)=>{
         login(userInfo).then(response=>{
          if(response.success == true){
            const data = response.data[0]     
            commit('SET_USER',data)
         sessionStorage.setItem('loginAccount',JSON.stringify(data.userAccount))
         sessionStorage.setItem('loginName',JSON.stringify(data.userName))
         sessionStorage.setItem('loginPhone',JSON.stringify(data.phone))
         sessionStorage.setItem('userId',JSON.stringify(data.id))
          }
           resolve (response)
         }).catch(err=>{
           reject(err)
         })
      })

    }
  },
  modules: {
  }
})
