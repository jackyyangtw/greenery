import Vue from 'vue'
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'bootstrap';
import App from './App.vue'
import router from './router'
import "./bus"
import filterCurrency from "./filters/currency"
import filterDate from "./filters/date"
import VeeValidate from 'vee-validate'
import zhTW from 'vee-validate/dist/locale/zh_TW'
import VueI18n from 'vue-i18n'

//將跨域的cookie存入vue的伺服器
axios.defaults.withCredentials = true;

Vue.config.productionTip = false
Vue.use(VueAxios, axios);
Vue.use(VueI18n)
Vue.component('Loading', Loading);
Vue.filter('currency', filterCurrency)
Vue.filter('date', filterDate)





const i18n = new VueI18n({
  locale: 'zhTW'
})
Vue.use(VeeValidate, {
  events: 'input|blur', //這是為了讓使用者離開該欄位時觸發驗證
  i18n,
  dictionary: {
    zhTW
  }
})

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')

//查看用戶需不需要登入
//to 去哪個頁面，from從哪個頁面
//next是一個函式
//詳見官網https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB
router.beforeEach((to,from,next)=>{
  console.log('to',to,'from',from)
  console.log('這是next',next)
  //如果要去的頁面具有requiresAuth的話(需要認證的話)
  if(to.meta.requiresAuth){
    console.log('這裡需要驗證')
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    //用this.$http會出錯(因為這種方法只能在元件內使用，router不是元件)
    axios.post(api).then((response)=>{
      console.log('這是response.data',response.data)
      //如果認證通過的話
      if(response.data.success){
        //放行
        next()
      }else{
        next({
          path: '/login'
        })
      }
    })
  } else {
    //放行
    next()
  }
  //加上next就不會被擋
  // next()
})



