import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

import productsModules from './products'
import cartsModules from './carts'
import couponsModules from './coupon'
import checkoutModules from './checkout'
import heartModules from './heart'

Vue.use(Vuex);


export default new Vuex.Store({
  //嚴謹模式，出現不符合規範的語法就跳錯
  strict: true,
  state:{
    isLoading: false,
    messages:[]
  },
  //操作行為，不操作資料狀態
  actions: {
    //context是固定參數，status 是 payload(載荷)
    updateLoading(context,status){
      context.commit('LOADING',status)
    },
    updateMessage(context,{message, status}) {
      context.commit('MESSAGE',{ message,status })
      const timestamp = Math.floor(new Date() / 1000);
      context.dispatch('removeMessageWithTiming',timestamp)
    },
    //按下X關掉
    removeMessage(context,num) {
      context.commit('REMOVEMESSAGE', num);
    },
    removeMessageWithTiming(context,timestamp) {
      setTimeout(() => {
        context.state.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            context.state.messages.splice(i, 1);
          }
        });
      }, 5000);
    },
  },
  //寫入資料
  //操作狀態，可用常數命名(大寫)，state是上方的state
  //不可執行非同步狀態(ajax、settimeout等等)，會造成state和payload不相等，造成除錯困難
  mutations: {
    LOADING(state,status){
      state.isLoading = status;
      console.log("這是status",status)
    },
    MESSAGE(state,{message,status}) {
      const timestamp = Math.floor(new Date() / 1000);
      state.messages.push({
        message,
        status,
        timestamp,
      });
    },
    REMOVEMESSAGE(state, num) {
      state.messages.splice(num, 1);
    },
  },
  getters: {
    messages: state => state.messages
  },
  modules:{
    productsModules,
    cartsModules,
    couponsModules,
    checkoutModules,
    heartModules,
  }
})