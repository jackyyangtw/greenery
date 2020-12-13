增加modal描述!
增加類別的商品數量
加入eventbus效果
<template>
  <div>
    <div class="container main-content mb-3 mt-3">
      <div class="row">
        <div class="col-md-3">
          <!-- 左側選單 (List group) -->
          <div class="list-group">
            <a class="list-group-item list-group-item-action"
              href="#" @click.prevent="searchText = item"
              :class="{ 'active': item === searchText}"
              v-for="item in categories" :key="item">
              {{ item }}
            </a>
            <a href="#" class="list-group-item list-group-item-action"
              @click.prevent="searchText = ''"
              :class="{ 'active': searchText === ''}">
              全部顯示
            </a>
          </div>
        </div>

        <!-- 子頁面 -->
        <div class="col-md-9">
          <div class="d-flex mb-4">
            <!-- Search bar -->
            <form class="form-inline my-3 my-lg-0">
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
              <div class="col-md-4 mb-4 " v-for="(item) in filterData" :key="item.id">
                <div class="card border-0 box-shadow text-center h-100 img-fluid">
                  <img class="card-img-top priductPic" :src="item.imageUrl" alt="Card image cap" @click="openModal">
                  <div class="card-body card_text">
                    <h3 class="card-title">{{ item.title }}</h3>
                    <p class="card-text text-left mb-3">{{ item.content }}</p>
                    <p :class="{ discounted: item.price >0}" class="card-text text-right">NT${{ item.origin_price }}元/{{item.unit}}</p>
                    <p class="card-text text-right text-danger" v-if="item.price">現在只要:NT$ {{item.price}}/{{item.unit}}</p>
                  </div>
                  <div class="card-footer border-top-0 bg-white">
                    <button class="btn btn-outline-secondary btn-block btn-sm"
                      @click="addtoCart(item.id)">
                      <i class="fa fa-cart-plus" aria-hidden="true"></i> 加到購物車
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
        if(vm.products.id === item.id){
          return item
        }
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="sass">
@import '@/assets/sass/Shop.sass'
</style>