<template>
  <div>
    <div class="jumbotron jumbotron-fluid bg d-flex justify-content-center align-items-center">
      <div class="container">
        <div class="header_title p-4">
          <h1 class="text-center text-warning text_header">專屬優惠</h1>
        </div>
      </div>
    </div>
    <div class="d-flex flex-wrap">
      <div class="col-md-6 mb-3" data-aos="fade-up">
        <div class="coupon d-flex">
          <div class="left">
            <div class="h-100 d-flex justify-content-center align-items-center">
              <i class="far fa-copy fa-2x copyCoupon" data-clipboard-action="copy" data-clipboard-text="greenery86" @click="copyCoupon('綠意開幕慶!')"></i>
            </div>
          </div>
          <div class="right d-flex flex-column justify-content-center align-items-center">
            <div class="h3 m-2">綠意開幕慶!</div>
            <div class="h6">結帳輸入優惠碼：greenery86</div>
            <div class="h6">即享86折限時優惠</div>
            <div class="h6">優惠截止日期：2021/8/6</div>
          </div>
        </div>
      </div>
      <div class="col-md-6 mb-3" data-aos="fade-up">
        <div class="coupon d-flex">
          <div class="left">
            <div class="h-100 d-flex justify-content-center align-items-center">
              <i class="far fa-copy fa-2x copyCoupon" data-clipboard-action="copy" data-clipboard-text="decovid19" @click="copyCoupon('抗疫一起來!')"></i>
            </div>
          </div>
          <div class="right d-flex flex-column justify-content-center align-items-center">
            <div class="h3 m-2">抗疫一起來!</div>
            <div class="h6">結帳輸入優惠碼：decovid19</div>
            <div class="h6">即享91折限時優惠</div>
            <div class="h6">優惠截止日期：2021/9/1</div>
          </div>
        </div>
      </div>
      <div class="col-md-6 mb-3" data-aos="fade-up">
        <div class="coupon d-flex">
          <div class="left">
            <div class="h-100 d-flex justify-content-center align-items-center">
              <i class="far fa-copy fa-2x copyCoupon" data-clipboard-action="copy" data-clipboard-text="warm2021" @click="copyCoupon('寒冬的贈禮')"></i>
            </div>
          </div>
          <div class="right d-flex flex-column justify-content-center align-items-center">
            <div class="h3 m-2">寒冬的贈禮</div>
            <div class="h6">結帳輸入優惠碼：warm2021</div>
            <div class="h6">即享8折限時優惠</div>
            <div class="h6">優惠截止日期：2021/2/28</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Clipboard from 'clipboard'
export default {
  methods:{
    copyCoupon (couponTitle) {
      const vm = this
      const clipboard = new Clipboard('.copyCoupon')
      clipboard.on('success', function () {
        vm.$store.dispatch('updateMessage', { message: `已複製優惠券：${couponTitle}`, status: 'success' })
        clipboard.destroy()
      })
      clipboard.on('error', function () {
        vm.$store.dispatch('updateMessage', { message: '複製失敗請手動複製', status: 'danger' })
        clipboard.destroy()
      })
    }
  },
}
</script>

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

.coupon
  .left
    width: 30%
    background-color: $primary
    animation: shining 2s infinite alternate
    &::before
      content: ''
      position: absolute !important
      height: 100%
      width: 6px
      background-size: 6px 20px
  .right
    width: 70%
    border: 1px solid #ddd
@keyframes shining
  0%
    background-color: $primary
  100%
    background-color: lighten($primary,30)
.copyCoupon
  &:hover
    cursor: pointer

</style>