<template>
  <div id="app">
    <nav class="navbar navbar-light bg-light">
      <router-link class="navbar-brand" to="/">
        Greenery
      </router-link>
      <router-link class="navbar-brand mr-4" to="/login">首頁</router-link>
      <router-link class="navbar-brand mr-4" to="/login">所有商品</router-link>
      <!-- 購物車內的數量 (Button 內包含 icon, 數量 badge) -->
      <div class="dropdown ml-auto">

        <button class="btn btn-sm btn-cart" data-toggle="dropdown" data-flip="false">
          <i class="fa fa-shopping-cart text-dark fa-2x" aria-hidden="true"></i>
          <span class="badge badge-pill badge-danger">{{cart.carts.length}}</span>
          <span class="sr-only">unread messages</span>
        </button>
        <router-link class="navbar-brand" to="/login">登入</router-link>
        <div class="dropdown-menu dropdown-menu-right p-3" style="min-width: 300px"
          data-offset="400">
          <h6>已選擇商品</h6>
          <table class="table table-sm">
            <tbody>
              <tr v-for="item in cart.carts" :key="item.id">
                <td class="align-middle text-center" v-if="cart.carts.length">
                  <a href="#" class="text-muted" @click.prevent="removeCart(item.id)">
                    <i class="fas fa-trash" aria-hidden="true"></i>
                  </a>
                </td>
                <td class="align-middle">{{ item.product.title }}</td>
                <td class="align-middle">{{ item.qty }}{{item.product.unit}}</td>
                <td class="align-middle text-right">{{item.total}}</td>
              </tr>
            </tbody>
          </table>
          <button class="btn btn-primary btn-block">
            <i class="fa fa-cart-plus" aria-hidden="true"></i> 結帳去
          </button>
        </div>
      </div>
    </nav>
    <div class="jumbotron jumbotron-fluid jumbotron-bg d-flex align-items-end">
      <div class="container">
        <div class="p-3 bg-lighter">
          <h1 class="display-3 font-weight-bold">綠藝盎然 Greenery</h1>
          <p class="lead">環保，綠的代名詞。跟我們一起愛護地球，讓生活綠藝盎然!</p>
        </div>
      </div>
    </div>
    <Loading :active.sync="isLoading"></Loading>
    <router-view/>
    <footer class="bg-light text-muted py-5">
      <div class="container">
        <ul class="list-inline text-center">
          <li class="list-inline-item">© Copright 2020 綠藝盎然</li>
          <li class="list-inline-item">
            <a class="text-info" href="#">
              <i class="fa fa-instagram" aria-hidden="true"></i> Instagrame</a>
          </li>
          <li class="list-inline-item">
            <a class="text-info" href="#">
              <i class="fa fa-facebook-square" aria-hidden="true"></i> Facebook</a>
          </li>
          <li class="list-inline-item">
            <a class="text-info" href="#">About</a>
          </li>
        </ul>
        <p class="text-center">Made with Bootstrap4</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
export default {
  name: 'App',
  computed: {
    isLoading(){
      return this.$store.state.isLoading
    },
    ...mapGetters("cartsModules",['cart'])
  },  
  methods: {
    ...mapActions('cartsModules',['removeCart','getCart']),
  },
  created() {
    this.getCart();
  },
};
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
.jumbotron-bg {
  /* banners.png */
  background-image: url('./assets/header.jpg');
  background-size: cover;
  background-position: center center;
  min-height: 400px;
}
/* 半透明背景 */
.bg-lighter {
  background-color: rgba(255, 255, 255, .45);
}
/* 購物車按鈕 */
.btn-cart {
  background-color: transparent;
  position: relative;
}
/* 購物車按鈕定位 */
.btn-cart .badge {
  position: absolute;
  top: 1px;
  right: 1px;
}
.main-content {
  min-height: calc(100vh - 56px - 176px)
}
.box-shadow {
  box-shadow: 0px 2px 5px rgba(0, 0, 0, .05);
  transition: .3s linear;
}
.box-shadow:hover {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, .08);
}
.dropdown-menu-right {
  right: 0;
  left: auto;
}
.alert-rounded {
  border-radius: 50px;
}
</style>