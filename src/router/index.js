import Vue from 'vue'
import VueRouter from 'vue-router'

//frontend
import Home from '@/views/Home'
import About from '@/views/About'
import Login from '@/views/Login'

//backend
import Dashboard from '@/views/backend/Dashboard'
import Products from '@/views/backend/Products'
import CustomerOrders from '@/views/backend/CustomerOrders'
import CustomerCheckout from '@/views/backend/CustomerCheckout'
import Orders from '@/views/backend/Orders'
import Cupons from '@/views/backend/Cupons'


Vue.use(VueRouter);
export default new VueRouter({
  routes: [
    {
      //防止用戶進入未定義頁面(自創網址等等)，重新導向login頁面
      path: '*',
      redirect: '/login'
    },
    {
      //元件呈現名稱
      name:'Home',
      //對應虛擬路徑(網址上的)
      path:'/',
      //對應元件
      component: Home,
    },
    {
      path: '/login',
      name:'Login',
      component: Login
    },
    {
      path: '/admin',
      name:'Dashboard',
      component: Dashboard,
      children: [
        {
          //這邊不能多加上"/"
          path: 'products',
          name: 'Products',
          component: Products,
          //進入頁面前需要驗證
          meta: { requiresAuth : true },          
        },
        {
          //這邊不能多加上"/"
          path: 'cupons',
          name: 'Cupons',
          component: Cupons,
          meta: { requiresAuth : true },           
        },
        {
          //這邊不能多加上"/"
          path: 'orders',
          name: 'Orders',
          component: Orders,
          meta: { requiresAuth : true },           
        },
      ]
    },{
      path: '/',
      name:'Dashboard2',
      component: Dashboard,
      children: [
        {
          //這邊不能多加上"/"
          path: 'customer_orders',
          name: 'CustomerOrders',
          component: CustomerOrders,         
        },
        {
          //這邊不能多加上"/"
          path: 'customer_checkout/:orderId',
          name: 'CustomerCheckout',
          component: CustomerCheckout,         
        },
      ]    
    },
  ]
})


//3.0寫法
// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

// Vue.use(VueRouter)

// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
// ]

// const router = new VueRouter({
//   routes
// })

// export default router
