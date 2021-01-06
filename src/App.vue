
<template>
  <div id="app">
    <nav class="navbar navbar-light bg-light w-100">
      <router-link class="navbar-brand" to="/home">
        Greenery
      </router-link>
      <router-link class="navbar-brand ml-4 desktop text-primary" to="/home"><i class="fas fa-globe-asia mr-1"></i>關於我們</router-link>
      <router-link class="navbar-brand ml-2 desktop text-primary" to="/shop"><i class="fas fa-clipboard-list mr-1"></i>所有商品</router-link>
      <router-link class="navbar-brand ml-2 desktop text-primary" to="/favorite"><i class="fas fa-heart mr-1"></i>收藏清單</router-link>
      <!-- 購物車內的數量 (Button 內包含 icon, 數量 badge) -->
      <!-- 下拉選單按鈕 -->
      <div class="dropdown ml-auto d-flex align-items-center">
        <button class="btn btn-sm btn-cart mr-2" data-toggle="dropdown" data-flip="false">
          <i class="fa fa-shopping-cart text-dark fa-2x" aria-hidden="true"></i>
          <span class="badge badge-pill badge-danger">{{cart.carts.length}}</span>
          <span class="sr-only">unread messages</span>
        </button>
        <router-link class="navbar-brand text-primary" to="/login">登入</router-link>
        <!-- 購物清單 -->
        <!-- dropdown-menu 是bootstrap的class -->
        <div class="dropdown-menu dropdown-menu-right p-3" style="min-width: 300px"
          data-offset="400">
          <h6 class="mb-3 text-center"><i class="fas fa-clipboard-list mr-3 text-primary"></i>已選擇商品</h6>
          <table class="table table-sm">
            <tbody>
              <tr v-if="!cart.carts.length" class="text-center">
                <td>購物車目前沒東西唷!</td>
              </tr>
              <tr v-for="item in cart.carts" :key="item.id">
                <td class="align-middle text-center" v-if="cart.carts.length">
                  <a href="#" class="text-muted trashCan" @click.prevent="removeCart(item.id)">
                    <i class="fas fa-trash" aria-hidden="true"></i>
                  </a>
                </td>
                <td class="align-middle">{{ item.product.title }}</td>
                <td class="align-middle">{{ item.qty }}{{item.product.unit}}</td>
                <td class="align-middle text-right">NT${{item.total}}</td>
              </tr>
            </tbody>
            <tfoot class="mt-4">
              <tr v-if="cart.carts.length">
                <td class="text-right">總計</td>
                <td></td>
                <td></td>
                <td class="text-right">NT${{ cart.final_total }}</td>
              </tr>
            </tfoot>
          </table>
          <button class="btn btn-primary btn-block" v-if="cart.carts.length">
            <router-link to="/front_orders">
              <i class="fa fa-cart-plus text-light mr-2" aria-hidden="true"></i> 
              <span class="text-light">結帳去</span>
            </router-link>
          </button>
        </div>
      </div>
      <!-- 漢堡選單 -->
      <div class="hamburger">
        <button class="navbar-toggler bread" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse hamburg_list"
            id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item active"><router-link class="navbar-brand nav-link" to="/">關於我們</router-link></li>
                <li class="nav-item"><router-link class="navbar-brand nav-link" to="/shop">所有商品</router-link></li>
            </ul>
        </div>
      </div>
      
    </nav>
    <div class="jumbotron jumbotron-fluid jumbotron-bg d-flex align-items-end m-0 p-5">
      <div class="container">
        <div class="p-5 bg-lighter mt-5">
          <h1 class="display-5 font-weight-bold text-center">綠藝盎然 Greenery</h1>
          <p class="lead text-center">環保，綠的代名詞。跟我們一起愛護地球，讓生活綠藝盎然!</p>
        </div>
        <div class="d-flex justify-content-center align-items-center mt-5">
          <div>
            <p class="h5">探索Greenery吧~</p>
            <p class="text-center h5 drop">V</p>
          </div>
        </div>
      </div>
    </div>
    <Loading :active.sync="isLoading"></Loading>
    <!-- 轉跳頁面效果 -->
    <Alert/>
    <transition name="page" mode="out-in">
      <router-view key="$route.path"/>
    </transition>
    <footer class="text-muted py-5">
      <div class="container">
        <ul class="list-inline text-center">
          <li class="list-inline-item">© Copright 2020 綠藝盎然</li>
          <li class="list-inline-item">
            <a class="text-info" href="#">
              <i class="fab fa-facebook-square"></i>
            </a>
          </li>
          <li class="list-inline-item">
            <a class="text-info" href="#">
              <i class="fab fa-instagram ig"></i>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
import Alert from "@/components/AlertMessage";
export default {
  name: 'App',
  components: {
    Alert
  },
  computed: {
    isLoading(){
      return this.$store.state.isLoading
    },
    ...mapGetters("cartsModules",['cart'])
  },  
  methods: {
    ...mapActions('cartsModules',['removeCart','getCart']),
    updateMessage() {
      this.$bus.$emit('message:push', '成功', '商品已成功加入購物車', 'success');
    },
  },
  created() {
    this.getCart();
  },
};
</script>

<style lang="sass">
@import '@/assets/sass/_reset.sass'
@import "~bootstrap/scss/bootstrap";
</style>

<style lang="sass" scoped>
@import 'assets/sass/App'
</style>
