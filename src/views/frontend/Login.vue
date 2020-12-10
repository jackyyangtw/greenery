<template>
  <div>
    <form class="form-signin" @submit.prevent="signin">
      <h1 class="h3 mb-3 font-weight-normal">管理者平台</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" id="inputEmail" class="form-control" v-model="user.username"
        placeholder="Email address" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" v-model="user.password"
      placeholder="Password" required>
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2020</p>
    </form>
  </div>
</template>

<script>
export default {
  // name: 'HelloWorld',
  data () {
    return {
      user: {
        password: '',
        username: ''
      }
    }
  },
  methods: {
    //這個方法沒有認證的部分，認證的部分在main.js
    signin (){
      //api加上admin
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`
      const vm = this
      //post將用戶資料傳入
      //vm.user 帳號密碼
      //response 後端回傳的資料
      this.$store.dispatch('updateLoading',true)
      this.$http.post(api,vm.user).then((response)=>{
        console.log('這是response',response)
        console.log('這是vm.user',vm.user)
        console.log('這是response.data',response.data)
        if(response.data.success){
          vm.$store.dispatch('updateLoading',false)
          vm.$router.push('/admin/products')
          //cookie值
          const token = response.data.token;
          const expired = response.data.expired;
          console.log(token, expired);
          //expired要轉成timestamp  new Date(expired)
          document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
        }
      })      
    }
  }
}
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
