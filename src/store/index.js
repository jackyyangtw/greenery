import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

import productsModules from './products'
import cartsModules from './carts'
Vue.use(Vuex);


export default new Vuex.Store({
  //嚴謹模式，出現不符合規範的語法就跳錯
  strict: true,
  state:{
    isLoading: false,
  },
  //操作行為，不操作資料狀態
  actions: {
    //context是固定參數，status 是 payload(載荷)
    updateLoading(context,status){
      context.commit('LOADING',status)
    },
  },
  //寫入資料
  //操作狀態，可用常數命名(大寫)，state是上方的state
  //不可執行非同步狀態(ajax、settimeout等等)，會造成state和payload不相等，造成除錯困難
  mutations: {
    LOADING(state,status){
      state.isLoading = status;
      console.log("這是status",status)
    }
  },
  modules:{
    productsModules,
    cartsModules
  }
})