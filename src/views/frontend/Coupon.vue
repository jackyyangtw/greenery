<template>
  <div>
    <div class="jumbotron jumbotron-fluid bg d-flex justify-content-center align-items-center">
      <div class="container">
        <div class="header_title p-4">
          <h1 class="text-center text-warning">專屬優惠</h1>
        </div>
      </div>

    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/sass/Shop.sass'
@import '@/assets/sass/_grid.sass'
.bg
  background-image: url('../../assets/couponHeader.jpg')
  background-size: cover
  background-position: 25% 73%
  min-height: 350px
.bg-lighter 
  background-color: rgba(255, 255, 255, .45)
  letter-spacing: 16px
.header_title
  letter-spacing: 16px
  color: lighten(grey,80)
  +ipad
    width: 100% !important
</style>