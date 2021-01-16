<template>
  <div>
    <div class="wrap">
    <div class="jumbotron jumbotron-fluid jumbotron-bg d-flex align-items-end m-0 p-5">
      <div class="container">
        <div class="text-light text_header">
          <h1 class="display-5 font-weight-bold text-center">綠藝盎然 Greenery</h1>
          <p class="lead text-center font-weight-bold">環保，綠的代名詞。跟我們一起愛護地球，讓生活綠藝盎然!</p>
        </div>
        <div class="d-flex justify-content-center align-items-center mt-5">
          <div>
            <p class="h5 header_text text-light">探索Greenery吧~</p>
            <p class="text-center h5 drop text-light">V</p>
          </div>
        </div>
      </div>
    </div>
      <div class="toTop bg-light p-2 rounded-circle">
        <a href="#searchBar"><i class="fas fa-arrow-up"></i></a>
      </div>
      <section id="bugQue">
        <div class="title animated_fadeIn">
          <img class="bug1 " src="@/assets/cockroach.png" alt="">
          <h2>您是否也有下困擾，又不知道怎麼解決呢?</h2>
        </div>
        <div class="content">
          <div class="spaceBetween">
            <h3 class="animated_slideToRight">螞蟻怎麼又出現了!</h3>
            <h3 class="animated_slideToLeft">家裡怎麼有這麼多果蠅?</h3>
          </div>
          <div class="ant animated_slideToRight">
            <img src="@/assets/ant.png" alt="">
          </div>
          <div class="spaceBetween">
            <h3 class="animated_slideToRight">媽呀!有蟑螂!</h3>
            <h3 class="animated_slideToLeft">怎麼又有蒼蠅!?</h3>
          </div>
        </div>
        <div class="text">
          <i class="fas fa-globe-asia earth animated_slideDown"></i>
          <h2 class="animated_fadeIn">您的聲音，我們聽到了。</h2>
          <p class="animated_fadeIn">我們推出一些商品，在生活同時也響應環保!</p>
        </div>
        <div class="mountains animated_fadeIn">
          <i class="fas fa-mountain m"></i>
          <i class="fas fa-mountain s"></i>
          <i class="fas fa-mountain l"></i>
          <i class="fas fa-mountain s last"></i>
        </div>
      </section>
      <!-- 改成輪撥 -->
      <section id="bugprevent">
        <div class="title">
          <h2>防蟲專區</h2>
          <h2 class="subtitle">BugPrevent</h2>
        </div>
        <VueSlickCarousel v-bind="settings" v-if="products.length">
          <div class="cards" v-for="(item) in bugData" :key="item.id">
            <div class="card" v-if="item.category">
              <router-link to="/shop">
                <img :src="item.imageUrl" alt="">
              </router-link>
              <div class="text">
                <h2>{{ item.title }}</h2>
                <h3 class="middel">{{ item.content }}</h3>
                <h3>NT${{item.origin_price}}</h3>
              </div>
            </div>
          </div>
        </VueSlickCarousel>
      </section>
      <section id="nature">
        <div class="sky">
          <div class="fas fa-sun sun"></div>
          <div class="cloudbox">
            <div class="fas fa-cloud cloud cloud1"></div>
            <div class="fas fa-cloud cloud cloud2"></div>
            <div class="fas fa-cloud cloud cloud3"></div>
            <div class="fas fa-cloud cloud cloud4"></div>
          </div>
        </div>
        <div class="content"> 
          <div class="icons">
            <i class="fa fa-water water"></i>
            <i class="fa fa-fish fish"></i>
            <i class="fas fa-bug bug"></i>
          </div>
          <h2>曾經，大自然給我們一個資源豐富、美麗的環境。</h2>
        </div>
        <div class="trees">
          <i class="fas fa-tree"></i>
          <i class="fas fa-tree m"></i>
          <i class="fas fa-tree s"></i>
          <i class="fas fa-tree m"></i>
          <i class="fas fa-tree s"></i>
          <i class="fas fa-tree"></i>
          <i class="fas fa-tree m"></i>
          <i class="fas fa-tree s"></i>
          <i class="fas fa-tree"></i>
        </div>
      </section>
      <section id="danger">
        <img src="@/assets/danger.png" alt="">
        <h2 class="animated_slideToRight">現在，為滿足人類的需求，大肆的開發環境，造成環境汙染。</h2>
      </section>
      <section id="example">
        <div class="title">
          <h2>環境的汙染</h2>
        </div>
        <div class="content animated_slideToRight">
          <img src="@/assets/forest.jpg" alt="">
          <div class="text">
            <h3>森林破壞</h3>
            <p>人為因素的森林破壞包括森林採伐，人類引起森林火災，酸雨和引進的物種。也有自然因素可能會破壞森林，包括森林火災、昆蟲、疾病、天氣、物種之間的競爭等。</p>
          </div>
        </div>
        <div class="content animated_slideToRight">
          <img src="@/assets/river.jpg" alt="">
          <div class="text">
            <h3>河川汙染</h3>
            <p>水污染正在成為世界死亡和疾病的主要黑手，每天有14,000多人因此喪生。據估算，在印度每天約有580人死於水污染有關的疾病。中國水資源中約有九成被污染。</p>
          </div>
        </div>
        <div class="content animated_slideToRight">
          <img src="@/assets/air.jpg" alt="">
          <div class="text">
            <h3>空氣汙染</h3>
            <p>空氣污染的一個重要風險因素是導致一系列健康問題，包括呼吸感染、心臟病、慢性阻塞性肺病、中風和肺癌。</p>
          </div>
        </div>
      </section>
      <section id="copperIntro">
        <div class="title">
          <i class="fas fa-atom animated_showUp"></i>
          <h3 class="animated_fadeIn">為了愛地球提倡環保，我們致力尋找環保素材。</h3>
          <h2 class="animated_fadeIn">終於，我們發現了-銅離子</h2>
        </div>
        <div class="intro">
          <div class="img animated_scale">
            <img src="@/assets/copperion.png" alt="">
          </div>
          <h2 class="animated_fadeIn">什麼是銅離子?</h2>
          <br>
          <p class="animated_fadeIn">銅離子抗菌纖維是一種機能性纖維，具有阻斷疾病傳播、消除異味、修復皮膚等效果，是新型的抗菌紡織品。早在2008年，美國環境保護機構(NRDC)就登記核准了五種銅合金用於抗菌材料，這些銅合金可以在2小時內殺滅物體表面99%的細菌。</p>
          <p class="animated_fadeIn">銅是人體內本身就含有的生命元素，所以銅離子的化合物都可溶解，進入人體的銅，也進行正常的新陳代謝排出體外，對人體皮膚無刺激性及過敏現象，對人體健康安全無虞。</p>
        </div>
      </section>
      <section id="testTitle">
        <div class="icons animated_slideToRight">
          <i class="fas fa-atom"></i>
          <i class="fas fa-plus"></i>
          <i class="far fa-lightbulb lightbulb" ></i>
          <i class="fas fa-equals"></i>
          <i class="fas fa-question"></i>
        </div>
        <h2 class="animated_fadeIn">然後...我們嘗試在日常使用的物品加入銅離子</h2>
        <h2 class="animated_fadeIn">發現了驚人的效果!</h2>
      </section>
      <section id="test">
        <div class="title animated_fadeIn">
          <h2>什麼驚人的效果呢?</h2>
          <h3>讓我們實驗給您看!</h3>
          <hr>
        </div>
        <div class="contents">
          <div class="content">
            <div class="img animated_showUp">
              <img src="@/assets/copperion_test.jpg" alt="">
            </div>
            
            <div class="text animated_fadeIn">
              <h2>培養皿測試</h2>
              <p>在培養皿中放入銅離子母片和沒有放入銅離子母片做比較，有銅離子的話，培養皿裡面幾乎沒有受到細菌汙染!</p>
            </div>
          </div>
          <div class="content">
            <div class="img animated_showUp">
              <img src="@/assets/no_copperion.jpg" alt="">
            </div>
            <div class="text animated_fadeIn">
              <h2>未加入銅離子</h2>
              <p>未加入銅離子的商品放在水中，時間久了就會褪色，被細菌汙染，變得醜醜的，耐用性降低很多!</p>
            </div>
          </div>
          <div class="content">
            <div class="img animated_showUp">
              <img src="@/assets/copperion.jpg" alt="">
            </div>
            <div class="text animated_fadeIn">
              <h2>加入銅離子後</h2>
              <p>加入銅離子的商品，不但沒受到細菌汙染，而且還不會退色，保持商品的功能與外觀，並且提升耐用性!  </p>
            </div>
          </div>
        </div>
      </section>
      <section id="copperProductTitle">
        <div class="text ">
          <i class="fas fa-globe-asia earth animated_slideDown"></i>
          <h2 class="animated_fadeIn">為了愛護地球，環保必須從你我做起。</h2>
          <p class="animated_fadeIn">我們推出一些商品，在生活同時也響應環保!</p>
        </div>
        <div class="mountains animated_fadeIn">
          <i class="fas fa-mountain m"></i>
          <i class="fas fa-mountain s"></i>
          <i class="fas fa-mountain l"></i>
          <i class="fas fa-mountain s last"></i>
        </div>
      </section>
      <section id="copperProduct">
        <div class="title">
          <h2>抗菌專區</h2>
          <h2 class="subtitle">Antibacterial</h2>
        </div>
        <VueSlickCarousel v-bind="settings" v-if="products.length">
          <div class="cards" v-for="(item) in ionData" :key="item.id">
            <div class="card">
              <router-link to="/shop">
                <img :src="item.imageUrl" alt="">
              </router-link>
              <div class="text">
                <h2>{{ item.title }}</h2>
                <h3 class="middel">{{ item.content }}</h3>
                <h3>NT${{item.origin_price}}</h3>
              </div>
            </div>
          </div>
        </VueSlickCarousel>
      </section>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import "~bootstrap/scss/bootstrap";
@import '@/assets/sass/Home.sass'
.jumbotron-bg 
  /* banners.png */
  background-image: url('../../assets/header.jpg')
  background-size: cover
  background-position: center center
  min-height: 400px

/* 購物車按鈕 */
.btn-cart 
  background-color: transparent
  position: relative
.trashCan
  i
    &:hover,&:active
      color: $item_lightGreen

/* 購物車按鈕定位 */
.btn-cart .badge 
  position: absolute
  top: 1px
  right: 1px


.main-content 
  min-height: calc(100vh - 56px - 176px)

.box-shadow 
  box-shadow: 0px 2px 5px rgba(0, 0, 0, .05)
  transition: .3s linear

.box-shadow:hover 
  box-shadow: 0px 4px 10px rgba(0, 0, 0, .08)

.dropdown-menu-right 
  right: 0
  left: auto

.alert-rounded 
  border-radius: 50px
.drop
  animation: drop 2s infinite
@keyframes drop
  0%
    opacity: 1
    transform: translateY(0px)
  100%
    opacity: 0
    transform: translateY(20px)

</style>

<script>
import { mapActions,mapGetters } from 'vuex'
import $ from 'jquery'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  name: 'MyComponent',
  components: { 
    VueSlickCarousel,
  },
  data(){
    return {
      settings:{
        slidesToShow: 2,
        autoplay: true,
        arrows: false,
        dots: true,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              autoplay: true,
            }
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions('productsModules',['getProducts']),
  },
  computed: {
    ...mapGetters('productsModules',['products']),
    bugData(){
      const vm = this
      return vm.products.filter((item)=>{
        if(item.category === '防蟲'){
          return item
        }
      })
    },
    ionData(){
      const vm = this
      return vm.products.filter((item)=>{
        if(item.category === '銅離子'){
          return item
        }
      })
    },
    filterData() {
      const vm = this;
      if (vm.searchText) {
        return vm.products.filter((item) => {
          const data = item.title.toLowerCase().includes(vm.searchText.toLowerCase());
          return data;
        });
      }
      return this.products;
    },
  },
  //可直接使用getProducts，因為有mapActions
  created(){
    this.getProducts();
  },
  //操作DOM元素要在mounted階段
  mounted(){
    $(document).ready(()=>{
      $('.toTop').click((event) => {
        event.preventDefault();
        $('html,body').animate({ scrollTop: 0 }, 500);
      });
      $(window).scroll(function(){
        var scrollPos = $(window).scrollTop()
        var windowHeight = $(window).height()
        $('.animated_fadeIn').each(function(){
          var thisPos = $(this).offset().top
          if(thisPos <= (windowHeight/1.5 + scrollPos)){
            $(this).addClass('fadeIn')
          }
        })
        $('.animated_slideToRight').each(function(){
          var thisPos = $(this).offset().top
          if(thisPos <= (windowHeight/1.5 + scrollPos)){
            $(this).addClass('slideToRight')
          }
        })
        $('.animated_slideToLeft').each(function(){
          var thisPos = $(this).offset().top
          if(thisPos <= (windowHeight/1.5 + (scrollPos) )){
            $(this).addClass('slideToLeft')
          }
        })
        $('.animated_slideDown').each(function(){
          var thisPos = $(this).offset().top
          if(thisPos <= (windowHeight/1.5 + (scrollPos) )){
            $(this).addClass('slideDown')
          }
        })
        $('.animated_showUp').each(function(){
          var thisPos = $(this).offset().top
          if(thisPos <= (windowHeight/1.5 + (scrollPos) )){
            $(this).addClass('showUp')
          }
        })
        $('.animated_scale').each(function(){
          var thisPos = $(this).offset().top
          if(thisPos <= (windowHeight/1.5 + (scrollPos) )){
            $(this).addClass('scale')
          }
        })
        if ($(window).scrollTop() >= 50) {
          $('.toTop').fadeIn();
        } else {
          $('.toTop').fadeOut();
        }
      })
    })
  }
}
</script>



