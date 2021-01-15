import axios from 'axios'
import Vue from 'vue'
export default{
  //state 是模組區域變數  
  //nutations actions getter 是全域變數
  namespaced: true, //讓nutations actions getter 變成區域變數，方便將每個行為區分管理
  strict: true,
  state:{
    products: [],
    categories: [],
    myFavorite: JSON.parse(localStorage.getItem('myFavorite')) || [],
  },
  //操作行為，不操作資料狀態
  actions: {
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
      localStorage.removeItem('myFavorite')
      // localStorage.setItem('myFavorite', JSON.stringify(state.myFavorite))
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
      console.log("categories",categories)
      //上方的state
      console.log("這是CATEGORIES的state",state)
      //商品陣列
      console.log("這是CATEGORIES的payload",payload)
      payload.forEach((item) => {
        //將item.category存入categories
        categories.add(item.category);
      });
      console.log("forEach後的categories",categories)
      //將字串變成陣列存到state.categories
      state.categories = Array.from(categories);
      console.log("state.categories",state.categories)
    },
  },
  getters: {
    categories: state =>state.categories,
    products: state => state.products,
    myFavorite: state => state.myFavorite,
  }
}