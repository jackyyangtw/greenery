<template>
  <div>
    <div class="title">
      <h2 class="text-center pt-5">購物清單</h2>
    </div>
    <div class="row justify-content-center ">
      <div class="col-md-6 col-sm-8 col-10 mt-2 mb-5 justify-content-center p-5 order">
        <table class="table">
          <thead>
            <th></th>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody>
            <!-- 商品陣列不包含總價 -->
            <tr v-for="item in cart.carts" :key="item.id">
              <td>
                <button class="btn" @click="removeCart(item.id)"><i class="fas fa-trash"></i></button>
              </td>
              <td>
                {{ item.product.title }}
                <div class="text-success" v-if="item.coupon">
                  已套用優惠碼
                </div>
              </td>
              <td>{{ item.qty }}/{{item.product.unit}}</td>
              <td>{{ item.product.price }}元</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td class="text-left">總計</td>
              <td></td>
              <td></td>
              <td :class="{'disconted':cart.final_total !== cart.total }">{{cart.total}}元</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
              <td class="text-left text-success">折扣價</td>
              <td></td>
              <td></td>
              <td class=" text-success">{{cart.final_total}}元</td>
            </tr>
          </tfoot>
        </table>
        <div class="input-group mb-3 input-group-sm" >
          <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="cupon_code">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" @click="addCouponCode">套用優惠碼</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 訂單 -->
    <div class="title">
      <h2 class="text-center pt-3">基本資料</h2>
    </div>
    <div class="row justify-content-center pb-5 ">
      <form class="col-md-6 col-sm-8 col-10 order p-5 mt-2" @submit.prevent="createOrder">
        <div class="form-group">
          <label for="useremail">Email</label>
          <input type="email" class="form-control" name="email" id="useremail"
            placeholder="請輸入 Email" v-validate="'required|email'" v-model="form.user.email">
          <span class="text-danger" v-if="errors.has('email')">
            <!-- 會顯示輸入錯誤在哪裡 -->
            {{errors.first("email")}}
          </span>
        </div>
      
        <div class="form-group">
          <label for="username">收件人姓名</label>
          <!-- is-invalid danger色的input框框 -->
          <input type="text" class="form-control" name="name" id="username" :class="{'is-invalid':errors.has('name')}"
            placeholder="輸入姓名"  v-validate="'required'" v-model="form.user.name">
            <!-- v-if="errors.has('name')" 如果沒輸入姓名的話 -->
          <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
        </div>
      
        <div class="form-group">
          <label for="usertel">收件人電話</label>
          <input type="tel" class="form-control" id="usertel" placeholder="請輸入電話" name="phone"
          v-validate="'required'" :class="{'is-invalid':errors.has('phone')}" v-model="form.user.tel">
          <span class="text-danger" v-if="errors.has('phone')">請輸入連絡電話</span>
        </div>
      
        <div class="form-group">
          <label for="useraddress">收件人地址</label>
          <input type="text" class="form-control" name="address" id="useraddress" 
            placeholder="請輸入地址" v-model="form.user.address">
          <span class="text-danger"></span>
        </div>
      
        <div class="form-group">
          <label for="comment">留言</label>
          <textarea name="" id="comment" class="form-control" cols="30" rows="10"
          v-model="form.message"></textarea>
        </div>
        <div class="text-right">
          <button class="btn btn-warning submit">送出訂單</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { mapGetters,mapActions } from 'vuex'
export default {
  data(){
    return{
      cupon_code: '',
      //包含總價、購物車商品
      product:{},
      //判斷哪個item在loading
      status:{
        //存放產品id
        loadingItem: ''
      },
      form: {
        user: {},
      }
    }
  },
  computed: {
    ...mapGetters('productsModules',['products']),
    ...mapGetters('cartsModules',['cart'])
  },
  methods: {
    ...mapActions('productsModules',['getProducts']),
    ...mapActions('cartsModules',['getCart','removeCart']),
    addCouponCode(){
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const coupon = {
        code: vm.cupon_code
      }
      this.$http.post(api,{data:coupon}).then((response)=>{
        if (response.data.success) {
          vm.getCart()
          vm.$store.dispatch('updateMessage', { message: response.data.message, status: 'success' })
        } else {
          vm.$store.dispatch('updateMessage', { message: response.data.message, status: 'danger' })
        }
      })         
    },
    createOrder(){
      const vm = this
      //建立訂單後會把所選的購物車資訊刪除
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      const order = vm.form
      //驗證用戶是否將表單輸入完整
      this.$validator.validate().then((result) => {
        if (result) {
          this.$http.post(api,{data: order}).then((response)=>{
            console.log("訂單已建立",response)
            if(response.data.success){
              vm.$router.push(`/front_checkout/${response.data.orderId}`)
            }
          })
        } else {
          console.log("欄位不完整")
        }
      });
    }
  },
  created(){
    this.getProducts()
    this.getCart()
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/sass/FrontOrders.sass'
</style>
