

<template>
  <div>
    
    <Alert/>
    <div class="jumbotron jumbotron-fluid bg d-flex justify-content-center align-items-center mb-0">
      <div class="container  mt-5">
        <div class="p-4 header_title">
          <h1 class="text-center">管理者平台</h1>
        </div>
      </div>
    </div>
    <Navbar/>
    <div class="container-fluid">
      <div class="row">
        <Sidebar/> 
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 p-3 px-4">
          <!-- 第二層router-view，第一層在app.vue -->
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>    

<script>
import Sidebar from "@/components/backend/Sidebar";
import Navbar from "@/components/backend/Navbar";
import Alert from "@/components/AlertMessage";
export default {
  components:{
    Sidebar,
    Navbar,
    Alert
  },
  created(){
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = `${token}`;
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/sass/_grid.sass'
.bg
  background-image: url('../../assets/loginHeader.jpeg')
  background-size: cover
  background-position: center center
  min-height: 350px
.header_title
  letter-spacing: 16px
  color: lighten(grey,80)
  +ipad
    width: 100% !important
  
</style>