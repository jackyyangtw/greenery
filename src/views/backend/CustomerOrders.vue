1.key是什麼?
https://cn.vuejs.org/v2/api/#key

2.什麼是動態屬性

3.Vee Validate:此版本是2.x版，目前已更新到3.x，使用方式差很多，之後再了解

<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage: `url(${item.imageUrl})`}">
          </div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">內容</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <!-- 沒特價只顯示原價，有特價的話顯示原價和特價 -->
              <del class="h6" v-if="!item.price">原價:{{ item.origin_price }}元</del>
              <div class="h5" v-if="item.price">原價:{{ item.origin_price }}元</div>
              <div class="h5" v-if="item.price">特價:{{ item.price }}元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <!-- //v-if -->
            <button type="button" class="btn btn-outline-secondary btn-sm" 
            @click="getProduct(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addToCart(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 詳細商品模板 -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" alt="">
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">{{ product.description }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
              <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
              <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
            </div>
            <select name="" class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{num}} {{product.unit}}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計 <strong>{{ product.num * product.price }}</strong> 元
            </div>
            <button type="button" class="btn btn-primary"
              @click="addToCart(product.id,product.num)">
              <i class="fas fa-spinner fa-spin"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row my-5 justify-content-center">
      <div class="row my-5 justify-content-center">
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
                <button class="btn" @click="removeCartItem(item.id)"><i class="fas fa-trash"></i></button>
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
              <td class="text-right" colspan="3">{{cart.total}}元</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
              <td class="text-left text-success">折扣價</td>
              <td class="text-right text-success" colspan="3">{{cart.final_total}}元</td>
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
    <div class="my-5 row justify-content-center">
      <form class="col-md-6" @submit.prevent="createOrder">
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
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data(){
    return{
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
    }
  },
  methods: {
    getProducts(){
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=:page`
      vm.isLoading = true
      this.$http.get(api).then((response)=>{
        console.log("這是所有產品列表",response)
        vm.products = response.data.products
        vm.isLoading = false
      })
    },
    //取得單一產品
    getProduct(id){
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      vm.status.loadingItem = id
      this.$http.get(api).then((response)=>{
        vm.product = response.data.product
        console.log(response)
        $("#productModal").modal("show")
        //這樣loadingItem.id 就不等於item.id 就不會執行載入動畫
        vm.status.loadingItem = ''
      })
    },
    //加入購物車
    addToCart(id,qty = 1){
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.status.loadingItem = id
      const cart = {
        product_id : id,
        qty
      }
      this.$http.post(api,{data: cart}).then((response)=>{
        console.log("這是加入購物車的東西",response)
        vm.status.loadingItem = ''
        vm.getCart()
        $("#productModal").modal("hide")
      })
    },
    //取得購物車列表
    getCart(){
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.isLoading = true
      this.$http.get(api).then((response)=>{
        
        console.log("這是購物車列表",response)
        vm.cart = response.data.data
        vm.isLoading = false
      })     
    },
    removeCartItem(id){
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      vm.isLoading = true
      this.$http.delete(api).then((response)=>{
        console.log("已刪除",response)
        vm.getCart()
        vm.isLoading = false
      })          
    },
    addCouponCode(){
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const coupon = {
        code: vm.cupon_code
      }
      vm.isLoading = true
      this.$http.post(api,{data:coupon}).then((response)=>{
        console.log("是否套用優惠券",response)
        vm.getCart()
        vm.isLoading = false
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
              vm.$router.push(`/simulation/customer_checkout/${response.data.orderId}`)
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

// <style lang="sass">
// *
//   border: solid 1px
// </style>