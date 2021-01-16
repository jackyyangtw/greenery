<template>
  <div>
    <div class="jumbotron jumbotron-fluid  bg d-flex justify-content-center align-items-center">
      <div class="container mt-5">
        <div class="p-4 header_title">
          <h1 class="text-center header_text">收藏清單</h1>
          <h3 class="text-center header_text"></h3>
        </div>
      </div>
    </div>
    <div class="d-flex flex-wrap">
      <!-- 沒有關注的商品 -->
      <div v-if="products.length" class="text-center d-flex justify-content-center align-items-center position-relative no_items">
        <div
          v-if="!favoriteData.length"
          
        >
          <div class="no_items p-3">
            <div class="h3 mb-3">目前沒有關注的商品哦</div>
            <router-link to="/shop" class="btn btn-outline-primary">趕快去看看吧~</router-link>
          </div>
        </div>
      </div>    
      <!-- 商品 -->          
      <div class="col-md-6 mb-4 col-sm-6 col-6 col-lg-4" v-for="(item) in favoriteData" :key="item.id">
        <div class="card border-2 box-shadow text-center img-fluid productCard ">
          <div class="overflow-hidden">
            <img class="card-img-top priductPic" :src="item.imageUrl" alt="Card image cap" @click="getProduct(item.id)">
          </div>
          <div class="card-body">
            <div class="title d-flex desktop_card_body">
              <h3 class="card-title text-info mobile_card_title">{{ item.title }}</h3>
              <p class="card-title text-light bg-warning p-1 rounded mobile"> {{item.category}} </p>
            </div>
            <div class="content d-flex justify-content-between align-items-center mobile_card_price">
              <div class="price">
                <p :class="{ discounted: item.price >0}" class="card-text text-right mb-1">NT${{ item.origin_price }}元/{{item.unit}}</p>
                <p class="card-text text-left text-primary m-0" v-if="item.price">NT$ {{item.price}}/{{item.unit}}</p>
              </div>
              <div class="mt-3">
                <a class="text-primary mr-3"
                  @click="addtoCart(item.id)">
                  <i class="fa fa-cart-plus" aria-hidden="true"></i>
                </a>
                <a class="text-primary heart" @click.prevent="addMyFavorite(item.id)" title="加入最愛">
                  <i class="far fa-heart fa-lg" :class="{'fas fa-heart fa-lg':item.isLike}"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal -->
      <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title text-info" id="exampleModalLongTitle">{{product.title}}</h3>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12">
                  <div class="d-flex">
                    <div class="img w-50">
                      <img :src="product.imageUrl" alt="">
                    </div>
                    <div class="content p-3 d-flex flex-column justify-content-center w-50">
                      <div class="text-light card-title text-center bg-warning rounded mb-2 w-50">{{product.category}}</div>
                      <h4 class="text-primary border-bottom border-primary pb-2">產品介紹</h4>
                      <div class="text-content mb-1">
                        <p class="mb-1">{{product.content}}</p>
                        <p class="text-primary">{{product.description}}</p>
                      </div>
                      
                      <p :class="{ discounted: product.price >0}" class="card-text text-right">NT${{ product.origin_price }}元/{{product.unit}}</p>
                      <p class="card-text text-right text-primary font-weight-bold" v-if="product.price">NT$ {{product.price}}/{{product.unit}}</p>
                      <select name="" class="form-control mt-3" v-model="product.num" id="">
                        <option :value="number" v-for="number in 10" :key="number">
                          選購 {{ number }} {{product.unit}}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
              <button type="button" class="btn btn-primary" @click="addtoCart(product.id,product.num)">
                <i class="fa fa-cart-plus mr-1" aria-hidden="true"></i>加入購物車
              </button>
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
</template>

<script>
import $ from 'jquery'

export default {
  //開發者工具上顯示的名稱
  name: 'Favorite',
  data(){
    return {
      product: {}
    }
  },
  computed: {
    favoriteData() {
      const vm = this
      return vm.products.filter(function (item) {
        return vm.myFavorite.indexOf(item.id) > -1
      })
    },
    isLoading () {
      return this.$store.state.isLoading
    },
    products () {
      return this.$store.state.products
    },
    myFavorite () {
      return this.$store.state.myFavorite
    },

  },
  methods: {
    addMyFavorite (id) {
      this.$store.dispatch('addMyFavorite', id)
    },
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
    getProducts(){
      this.$store.dispatch('getProducts')
    }
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
@import '@/assets/sass/_grid.sass'
.bg
  background-image: url('../../assets/favoriteHeader.jpeg')
  background-size: cover
  background-position: 25% 73%
  min-height: 350px
.bg-lighter 
  background-color: rgba(255, 255, 255, .45)
  letter-spacing: 16px
.header_title
  letter-spacing: 16px
  color: lighten(grey,80)
  +ipad
    width: 100% !important
.header_text
  text-shadow: 3px 3px 3px rgba(black,0.5)
.no_items
  width: 100%
  position: relative
  left: 50%
  transform: translateX(-50%)
.heart
  cursor: pointer
</style>