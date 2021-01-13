<template>
  <div>
    <div class="jumbotron jumbotron-fluid  bg d-flex justify-content-center align-items-center">
      <div class="container mt-5">
        <div class="p-4 header_title">
          <h1 class="text-center">購物市集</h1>
        </div>
      </div>
    </div>
    <div class="container main-content mb-3 mt-3">
      <div class="row position-relative">
        <div class="col-md-3">
          <!-- 左側選單 (List group) -->
          <ul class="list-group sticky-top list">
            <li class="list-group-item list-group-item-action type text-center bg-warning">商品種類</li>
            <a class="list-group-item list-group-item-action type "
              href="#" @click.prevent="searchText = item"
              :class="{ 'active': item === searchText}"
              v-for="item in categories" :key="item">
              {{ item }}
            </a>
            <a href="#" class="list-group-item list-group-item-action type "
              @click.prevent="searchText = ''"
              :class="{ 'active': searchText === ''}">
              全部顯示
            </a>
          </ul>
        </div>

        <!-- 子頁面 -->
        <div class="col-md-9" id="childPage">
          <div class="d-flex mb-4">
            <!-- Search bar -->
            <form class="form-inline my-3 my-lg-0" id="searchBar">
              <div class="input-group">
                <input class="form-control" type="text" v-model="searchText"
                  placeholder="Search" aria-label="Search">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button"
                    @click="searchText = ''">
                    <i class="fa fa-times"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <!-- content -->
          <div class="tab-pane" id="list-gift">
            <div class="row align-items-stretch">
              <!-- 商品 -->
              <div class="col-md-6 mb-4 col-sm-6 col-12 col-lg-4" v-for="(item) in filterData" :key="item.id">
                <div class="card border-2 box-shadow text-center img-fluid productCard ">
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
                      <div>
                        <button class="btn btn-outline-secondary btn-sm mr-3"
                          @click="addtoCart(item.id)">
                          <i class="fa fa-cart-plus" aria-hidden="true"></i>
                        </button>
                        <a class="text-primary" @click.prevent="addMyFavorite(item.id)" title="加入最愛">
                          <i class="far fa-heart fa-lg" :class="{'fas fa-heart fa-lg':item.isLike}"></i>
                        </a>
                      </div>
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
  name: 'Shop',
  data() {
    return {
      searchText: '',
      product: {},
    };
  },
  computed: {
    filterData() {
      const vm = this;
      if (vm.searchText) {
        return vm.products.filter((item) => {
          const data = item.title.toLowerCase().includes(vm.searchText.toLowerCase());
          return data;
        });
      }
      return this.products;
    },
    ...mapGetters('heartModules',['myFavorite']),
    ...mapGetters('productsModules',['categories','products']),
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
    addMyFavorite (id) {
      //id 不能加入大括號，會出錯!
      this.$store.dispatch('heartModules/addMyFavorite',id)
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
@import '@/assets/sass/_grid.sass'

.bg
  background-image: url('../../assets/shopHeader.jpeg')
  background-size: cover
  background-position: center center
  min-height: 350px
.header_title
  letter-spacing: 16px
  color: lighten(grey,80)
  +ipad
    width: 100% !important
</style>