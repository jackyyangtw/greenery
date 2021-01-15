import axios from 'axios'
import $ from 'jquery'
export default{
  namespaced: true,
  strict: true,
  state: {
    cart: {
      carts:[]
    }
  },
  actions: {
    getCart(context) {
      context.commit('LOADING',true,{ root:true })
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      axios.get(url).then((response) => {
        if (response.data.data.carts) {
          context.commit('CART',response.data.data)
        }
        context.commit('LOADING',false,{ root:true })
        console.log('取得購物車', response.data.data);
      });
    },
    removeCart(context,id) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      context.commit('LOADING',true,{ root:true })
      axios.delete(url).then((response) => {
        context.commit('LOADING',false,{ root:true })
        //調用
        context.dispatch('getCart')
        if(response.data.success){
          context.dispatch('updateMessage', {
            message: response.data.message,
            status: 'success',
          },
          { root: true });
        }
        console.log('刪除購物車項目', response);
      });
    },
    //{id, qty} 預設只能傳兩個參數，如果要傳三個，必須用物件包起來
    addtoCart(context,{id, qty}) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      context.commit('LOADING',true,{ root:true })
      const item = {
        product_id: id,
        qty,
      };
      axios.post(url, { data: item }).then((response) => {
        context.commit('LOADING',false,{ root:true })
        context.dispatch('getCart')
        if(response.data.success){
          context.dispatch('updateMessage', {
            message: response.data.message,
            status: 'success',
          },
          { root: true });
        }
        console.log('加入購物車:', response);
      });
    },
  },
  mutations: {
    CART(state,payload){
      //cart的陣列資料
      console.log('CART的payload',payload)
      state.cart = payload
    }
  },
  getters: {
    cart: state => state.cart
  }
}