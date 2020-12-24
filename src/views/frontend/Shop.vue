<template>
  <div>
    <div class="container main-content mb-3 mt-3">
      <div class="row position-relative">
        <div class="col-md-3">
          <!-- 左側選單 (List group) -->
          <ul class="list-group sticky-top">
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
              <div class="col-md-6 mb-4 col-sm-6 col-6 col-lg-4" v-for="(item) in filterData" :key="item.id">
                <div class="card border-2 box-shadow text-center img-fluid productCard ">
                  <div class="img overflow-hidden">
                    <img class="card-img-top priductPic" :src="item.imageUrl" alt="Card image cap" @click="openModal">
                  </div>
                  <div class="card-body">
                    <h3 class="card-title">{{ item.title }}</h3>
                    <div class="content d-flex justify-content-between align-items-center">
                      <div class="price">
                        <p :class="{ discounted: item.price >0}" class="card-text text-right">NT${{ item.origin_price }}元/{{item.unit}}</p>
                        <p class="card-text text-right text-danger" v-if="item.price">NT$ {{item.price}}/{{item.unit}}</p>
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
          <!-- Modal -->
          <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content" v-for="(item) in filterItem" :key="item.id">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">{{item.title}}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="d-flex">
                        <div class="img w-50">
                          <img :src="item.imageUrl" alt="">
                        </div>
                        <div class="content p-3 d-flex flex-column justify-content-center w-50">
                          <p>{{item.content}}</p>
                          <p>{{item.description}}</p>
                          <p :class="{ discounted: item.price >0}" class="card-text text-right">NT${{ item.origin_price }}元/{{item.unit}}</p>
                          <p class="card-text text-right text-danger" v-if="item.price">現在只要:NT$ {{item.price}}/{{item.unit}}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
                  <button type="button" class="btn btn-primary" @click="addtoCart(item.id)">
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
  name: 'Home',
  data() {
    return {
      searchText: '',
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
    filterItem(){
      const vm = this
      return vm.products.filter((item)=>{
        return vm.products.id == item.id
      })
    },
    ...mapGetters('productsModules',['categories','products'])
  },
  methods: {
    ...mapActions('productsModules',['getProducts']),
    //帶多個參數必須使用dispatch
    addtoCart(id, qty = 1) {
      this.$store.dispatch('cartsModules/addtoCart',{id,qty})
    },
    openModal(){
      $('#exampleModalLong').modal('show')
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
</style>