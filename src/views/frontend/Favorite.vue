<template>
  <div>
    <div class="container main-content mb-3 mt-3">
      <div class="row position-relative">
        <!-- 子頁面 -->
        <div class="col-md-9" id="childPage">
          <div class="tab-pane" id="list-gift">
            <div class="row align-items-stretch">
              <!-- 商品 -->
              <div v-if="products.length">
                <div
                  v-if="!favoriteData.length"
                  class="text-center d-flex justify-content-center align-items-center"
                >
                  <div>
                    <div class="h3 mb-3">目前沒有關注的商品哦</div>
                    <router-link to="/shop" class="btn btn-outline-primary">趕快去看看吧</router-link>
                  </div>
                </div>
              </div>              
              <div class="col-md-6 mb-4 col-sm-6 col-12 col-lg-4" v-for="(item) in favoriteData" :key="item.id">
                <div class="card border-2 box-shadow text-center img-fluid productCard " v-if="item.id">
                  <div class="overflow-hidden">
                    <img class="card-img-top priductPic" :src="item.imageUrl" alt="Card image cap" @click="getProduct(item.id)">
                  </div>
                  <div class="card-body">
                    <div class="title d-flex justify-content-between align-items-center">
                      <h3 class="card-title text-info">{{ item.title }}</h3>
                      <p class="card-title text-light bg-warning p-1 rounded"> {{item.category}} </p>
                    </div>
                    <div class="content d-flex justify-content-between align-items-center">
                      <div class="price">
                        <p :class="{ discounted: item.price >0}" class="card-text text-right mb-1">NT${{ item.origin_price }}元/{{item.unit}}</p>
                        <p class="card-text text-left text-primary m-0" v-if="item.price">NT$ {{item.price}}/{{item.unit}}</p>
                      </div>
                      <button class="btn btn-outline-secondary btn-sm"
                        @click="addtoCart(item.id)">
                        <i class="fa fa-cart-plus" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- toTop -->
          <div class="toTop bg-light p-2 rounded-circle">
            <a href="#searchBar"><i class="fas fa-arrow-up"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { mapGetters,mapActions } from 'vuex'

export default {
  //開發者工具上顯示的名稱
  name: 'Favorite',
  computed: {
    ...mapGetters('heartModules',['myFavorite']),
    ...mapGetters('productsModules',['categories','products']),
    favoriteData() {
      const vm = this
      return vm.products.filter(function(item) {
        return vm.myFavorite.indexOf(item.id) > -1
      })
    },
  },
  methods: {
    ...mapActions('productsModules',['getProducts']),
    //帶多個參數必須使用dispatch
    addtoCart(id, qty = 1) {
      this.$store.dispatch('cartsModules/addtoCart',{id,qty})
      $("#exampleModalLong").modal("hide")
    },
    getProduct(id){
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      this.$store.dispatch('updateLoading',true)
      this.$http.get(api).then((response)=>{
        vm.product = response.data.product
        vm.product.num = 1
        console.log(response)
        $("#exampleModalLong").modal("show")
        this.$store.dispatch('updateLoading',false)
      })
    },
  },
  created() {
    this.getProducts();
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    console.log("這是token",token)
    this.$http.defaults.headers.common.Authorization = `${token}`;
  },
  mounted(){
    $(document).ready(()=> {
      $(() => {
        $(window).scroll(() => {
          if ($(window).scrollTop() >= 50) {
            $('.toTop').fadeIn();
          } else {
            $('.toTop').fadeOut();
          }
        });
      });
      $('.toTop').click((event) => {
        event.preventDefault();
        $('html,body').animate({ scrollTop: 0 }, 500);
      });
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="sass" scoped>
@import '@/assets/sass/Shop.sass'
</style>