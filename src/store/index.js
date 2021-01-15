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
  namespaced: true,
  state:{
    isLoading: false,
    messages:[],
    categories: [],
    myFavorite: JSON.parse(localStorage.getItem('myFavorite')) || [],
    products: [],
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
      // const timestamp = Math.floor(new Date() / 1000);
      // this.removeMessageWithTiming(timestamp);
    },
    //按下X關掉
    removeMessage(context,num) {
      context.commit('REMOVEMESSAGE', num);
      // this.messages.splice(num, 1);
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
    getProducts(context) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      //{ root: true } 讀取全域的資料
      context.commit('LOADING',true , { root: true })
      axios.get(url).then((response) => {
        context.commit('CATEGORIES',response.data.products)
        console.log('取得產品列表:', response);
        context.commit('GET_PRODUCTS', response)
        context.commit('LOADING',false, { root: true });
      });
    },
    addMyFavorite (context, id) {
      context.commit('ADD_MYFAVORITE', id)
    }
  },
  //寫入資料
  //操作狀態，可用常數命名(大寫)，state是上方的state
  //不可執行非同步狀態(ajax、settimeout等等)，會造成state和payload不相等，造成除錯困難
  mutations: {
    ADD_MYFAVORITE (state, id) {
      state.products.forEach(function (item) {
        if (item.id === id) {
          item.isLike = !item.isLike
        }
      })
      const index = state.myFavorite.findIndex(function (item) {
        return item === id
      })
      if (index === -1) {
        state.myFavorite.push(id)
      } else {
        state.myFavorite.splice(index, 1)
      }
      localStorage.setItem('myFavorite', JSON.stringify(state.myFavorite))
    },
    GET_PRODUCTS (state, res) {
      state.products = res.data.products
      state.products.forEach(function (item) {
        Vue.set(item, 'isLike', false)
      })
      state.products.forEach(function (item) {
        state.myFavorite.forEach(function (itemLove) {
          if (itemLove === item.id) {
            item.isLike = true
          }
        })
      })
    },
    CATEGORIES(state,payload){
      //定義 categories 是一個新的物件
      const categories = new Set();
      payload.forEach((item) => {
        //將item.category存入categories
        categories.add(item.category);
      });
      console.log("forEach後的categories",categories)
      //將字串變成陣列存到state.categories
      state.categories = Array.from(categories);
      console.log("state.categories",state.categories)
    },
    LOADING(state,status){
      state.isLoading = status;
      console.log("這是status",status)
    },
    MESSAGE(state,status) {
      state.messages.push(status);
    },
    REMOVEMESSAGE(state, num) {
      state.messages.splice(num, 1);
    },
  },
  getters: {
    messages: state => state.messages,
    categories: state =>state.categories,
    products: state => state.products,
    myFavorite: state => state.myFavorite,
  },
  modules:{
    productsModules,
    cartsModules,
    couponsModules,
    checkoutModules,
    // heartModules,
  }
})