import axios from 'axios'
import $ from "jquery"

export default {
  strict: true,
  namespaced: true,
  state:{
    pagination: [],
    coupons:[],
    tempCoupon:{
    },
    isNew: false,
    //宣告時間物件
    due_date: new Date()
  },
  mutations: {
    PAGINATION(state,payload){
      state.pagination = payload
    },
    COUPONS(state,payload){
      state.coupons = payload
    },
    TEMPCOUPON(state,payload){
      state.tempCoupon = payload
    },
    ISNEW(state,payload){
      state.isNew = payload
    },
    DUEDATE(state,payload){
      state.due_date = payload
    }
  },
  actions: {
    getCoupon(context,page = 1){
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`
      context.commit('LOADING',true , { root: true })
      axios.get(api).then((response)=>{
        console.log(response.data)
        context.commit('COUPONS',response.data.coupons)
        context.commit('LOADING',false , { root: true })
        //分頁資訊
        context.commit('PAGINATION',response.data.pagination)
      })
    },
    openModal(context,{isNew, item}) {
      $('#couponModal').modal('show');
      context.commit('ISNEW',isNew)
      if (isNew) {
        let Coupon = {}
        context.commit('TEMPCOUPON',Coupon)
      } else {
        const coupon = Object.assign({
          title: item.title,
          percent: item.percent,
          due_date: item.due_date,
          code: item.code,
          is_enabled: item.is_enabled,
          id: item.id
        });
        context.commit('TEMPCOUPON',coupon);
        //轉成iso格式，方便使用者閱讀，否則都不顯示
        const dateAndTime = new Date(context.state.tempCoupon.due_date * 1000).toISOString().split('T');
        context.commit('DUEDATE',dateAndTime[0])
      }
    },
    updateCoupon(context) {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
      let httpMethod = 'post';
      if (!context.state.isNew) {
      api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${context.state.tempCoupon.id}`;
      httpMethod = 'put';
      }
      axios[httpMethod](api, { data: context.state.tempCoupon }).then((response) => {
        $('#couponModal').modal('hide');
        if (response.data.success) {
          $('#couponModal').modal('hide');
          context.dispatch('getCoupon');
        }
      });
    },
    openDelete(context,coupon){
      context.commit('TEMPCOUPON',coupon)
      $("#deleteModal").modal("show")
    },
    openDeleteSure(){
      const state = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${context.state.tempCoupon.id}`
      axios.delete(api).then((response)=>{
        console.log(response.data)
        context.dispatch('getCoupon')
      })
      $("#deleteModal").modal("hide")
    }
  },
  getters: {
    pagination: state => state.pagination,
    coupons: state =>state.coupons,
    tempCoupon: state =>state.tempCoupon,
    isNew: state => state.isNew,
    due_date: state => state.due_date
  }
}
