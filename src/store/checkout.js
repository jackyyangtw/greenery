import axios from 'axios'

export default{
  strict: true,
  state: {
    isLoading: false,
    cupon_code: '',
    //包含總價、購物車商品
    cart: {},
    products:[],
    product:{},
    //判斷哪個item在loading
    status:{
      //存放產品id
      loadingItem: ''
    },
    form: {
      user: {},
    }
  },
  actions: {
    getProducts(context){
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=:page`
      context.commit('LOADING',true,{root: true})
      axios.get(api).then((response)=>{
        console.log("這是所有產品列表",response)
        context.commit('PRODUCTS',response.data.products)
        context.commit('LOADING',false,{root: true})
      })
    },
    getCart(context){
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      context.commit('LOADING',true,{root:true})
      axios.get(api).then((response)=>{
        console.log("這是購物車列表",response)
        context.commit('CART',response.data.data,)
        context.connit('LOADING',false,{root: true})
      })     
    },
    removeCartItem(context,id){
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      context.commit('LOADING',true,{root: true})
      axios.delete(api).then((response)=>{
        console.log("已刪除",response)
        context.dispatch('getCart')
        context.commit('LOADING',false,{root: true})
      })          
    },
    addCouponCode(context){
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const coupon = {
        code: context.cupon_code
      }
      context.commit('LOADING',true,{root: true})
      axios.post(api,{data:coupon}).then((response)=>{
        console.log("是否套用優惠券",response)
        context.dispatch('getCart')
        context.commit('LOADING',false,{root: true})
      })         
    },
    createOrder(context){
      //建立訂單後會把所選的購物車資訊刪除
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      const order = context.form
      //驗證用戶是否將表單輸入完整
      context.$validator.validate().then((result) => {
        if (result) {
          axios.post(api,{data: order}).then((response)=>{
            console.log("訂單已建立",response)
            if(response.data.success){
              context.$router.push(`/customer_checkout/${response.data.orderId}`)
            }
          })
        } else {
          console.log("欄位不完整")
        }
      });
    }
  },
  mutations: {
    CART(state,payload){
      state.cart = payload
    },
    PRODUCTS(state,payload){
      state.products = payload
    }
  },
  getters:{
    cart: state => state.cart,
    products: state => state.products,
  }
}