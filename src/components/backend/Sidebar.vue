<template>
  <nav
    class="col-md-2 d-done d-md-block bg-light sidebar"
  >
    <div class="sidebar-sticky pt-3">
      <h6
        class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
      >
        <span>管理員</span>
        <a
          class="d-flex align-items-center text-muted"
          href="#"
          aria-label="Add a new report"
        >
          <span data-feather="plus-circle"></span>
        </a>
      </h6>
      <ul class="nav flex-column mb-2">
        <li class="nav-item">
          <router-link class="nav-link navlink" to="/admin/products">
            <i class="fas fa-box-open"></i>
            <span class="justify-content">產品列表</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link navlink" to="/admin/orders">
            <i class="fas fa-clipboard-list list"></i>
            <span class="justify-content">訂單列表</span>
            
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link navlink" to="/admin/cupons">
            <i class="fas fa-ticket-alt"></i>
            <span class="justify-content">優惠券</span>
            
          </router-link>
        </li>
      </ul>
      <h6
        class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
      >
        <span>模擬功能</span>
        <a
          class="d-flex align-items-center text-muted"
          href="#"
          aria-label="Add a new report"
        >
          <span data-feather="plus-circle"></span>
        </a>
      </h6>
      <ul class="nav flex-column mb-2">
        <li class="nav-item">
          <router-link to="/customer_orders" class="nav-link">
            模擬訂單
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="sass" scoped>
// *
//   border: 1px solid #000
.list
  font-size: 22px
i
  margin-right: 20px
  font-size: 15px
</style>