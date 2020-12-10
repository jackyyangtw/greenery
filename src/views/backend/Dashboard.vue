

<template>
  <div>
    <Navbar/>
    <Alert/>
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