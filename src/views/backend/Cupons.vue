//RangeError: Invalid time value"錯誤
//參考 vueshop
<template>
  <div>
    <div class="text-right mb-4">
      <button class="btn btn-primary" @click="openModal(true)">建立優惠券</button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">名稱</th>
          <th scope="col">折扣百分比</th>
          <th scope="col">到期日</th>
          <th scope="col">啟用與否</th>
          <th scope="col">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="coupon in coupons" :key="coupon.id">
          <th scope="row">{{coupon.title}}</th>
          <td>{{coupon.percent}}</td>
          <td>{{coupon.due_date | date}}</td>
          <td>
            <span class="text-success" v-if="coupon.is_enabled">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click="openModal(false,coupon)">編輯</button>
            <button class="btn btn-outline-primary btn-sm" @click="openDelete(coupon)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <Switchpages :pages="pagination" @switch="getCoupon"></Switchpages>
    <!-- coupon模板 -->
    <!-- 為何綁定v-model依然沒有新增到coupon列表?可先製作刪除 -->
    <!-- 記得要getCoupon -->
    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog" 
      aria-labelledby="couponModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="couponModalLabel">
              <span v-if="isNew">新增優惠券</span>
              <span v-else>編輯{{tempCoupon.title}}優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <div>
                  <label for="title">優惠券名稱</label>
                  <!-- form-control 套上primary顏色outline 變成網格長度 -->
                  <input class="form-control mb-2" type="text" 
                  placeholder="請輸入優惠券名稱" v-model="tempCoupon.title">
                </div>
                <!-- form-row 兩個input排成一排 -->
                <!-- 類似flexbox -->
                <div class="form-row">
                  <div class="col-md-6">
                    <label for="category">優惠碼</label>
                    <input class="form-control" type="text"
                    placeholder="請輸入優惠碼" v-model="tempCoupon.code">
                  </div>
                  <div class="col-md-6">
                    <label for="due_date">到期日</label>
                    <!-- v-model是綁定取得的時間，並非模板的 -->
                    <input type="date" class="form-control mb-2" v-model="due_date">
                  </div>
                </div>
                <div class="form-row">
                  <div class="col-md-6">
                    <label for="">折扣%數</label>
                    <input class="form-control mb-4" type="text" 
                    placeholder="請輸入數字" v-model="tempCoupon.percent">
                  </div>
                </div>
                <div class="form-row">
                  <div class="col-md-6">
                    <label for="">是否啟用</label>
                    <input type="checkbox" v-model="tempCoupon.is_enabled">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateCoupon">確認</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 刪除模板 -->
    <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">刪除優惠券</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{tempCoupon.title}}</strong> 優惠券，刪除後無法復原!
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="openDeleteSure">確認</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery"
import Switchpages from "@/components/Switchpages"
import { mapGetters,mapActions } from 'vuex'
export default {
  components: {
    Switchpages
  },
  watch: {
    //監看取得的時間，轉換成timestamp格式，可排序
    due_date(){
      const vm = this
      //math.floor取整數，如果是負數會變小
      const timeStamp = Math.floor(new Date(vm.due_date)/1000)
      //timeStamp總秒數
      vm.tempCoupon.due_date = timeStamp
    }
  },
  computed: {
    ...mapGetters('couponsModules',['pagination','coupons','tempCoupon','isNew','due_date'])
  },
  methods: {
    ...mapActions("couponsModules",['getCoupon','updateCoupon','openDelete','openDeleteSure']),
    openModal(isNew, item){
      this.$store.dispatch('couponsModules/openModal',{isNew, item})
    }
    // getCoupon(page = 1){
    //   const vm = this
    //   const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`
    //   vm.isLoading = true
    //   this.$http.get(api).then((response)=>{
    //     console.log(response.data)
    //     vm.coupons = response.data.coupons
    //     vm.isLoading = false
    //     //分頁資訊
    //     vm.pagination = response.data.pagination
    //   })
    // },
    // openModal(isNew, item) {
    //   const vm = this;
    //   $('#couponModal').modal('show');
    //   vm.isNew = isNew;
    //   if (vm.isNew) {
    //     vm.tempCoupon = {};
    //   } else {
    //     vm.tempCoupon = Object.assign({}, item);
    //     //轉成iso格式，方便使用者閱讀，否則都不顯示
    //     const dateAndTime = new Date(vm.tempCoupon.due_date * 1000).toISOString().split('T');
    //     vm.due_date = dateAndTime[0];
    //   }
    // },
    // updateCoupon(){
    //   const vm = this
    //   let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`
    //   let apiMethod = "post"
    //   vm.isLoading = true
    //   if(!vm.isNew){
    //     api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
    //     apiMethod = "put"
    //   }
    //   this.$http[apiMethod](api,{data: vm.tempCoupon}).then((response)=>{
    //     console.log(response.data)
    //     vm.getCoupon()
    //     vm.isLoading = false
    //   })
    //   $("#couponModal").modal("hide")
    // },
    // openDelete(coupon){
    //   this.tempCoupon = coupon
    //   $("#deleteModal").modal("show")
    // },
    // openDeleteSure(){
    //   const vm = this
    //   const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
    //   this.$http.delete(api).then((response)=>{
    //     console.log(response.data)
    //     vm.getCoupon()
    //   })
    //   $("#deleteModal").modal("hide")
    // }
  },
  created(){
    this.getCoupon()
  }
}
</script>