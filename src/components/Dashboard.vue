<template>
  <div>
    <Navbar/>
    <Alert/>
    <div class="container-fluid">
      <div class="row">
        <Sidebar/> 
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
          <!-- 第二層router-view，第一層在app.vue -->
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>    

<script>
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Alert from "./AlertMessage";
export default {
  components:{
    Sidebar,
    Navbar,
    Alert
  }
}
</script>