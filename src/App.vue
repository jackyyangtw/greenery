
<template>
  <div id="app">
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


<style lang="sass">
@import '@/assets/sass/_reset.sass'
@import "~bootstrap/scss/bootstrap";
</style>

<style lang="sass" scoped>
@import 'assets/sass/App'
</style>
