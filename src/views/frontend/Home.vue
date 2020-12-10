1.jquery動畫加入或是參考wow.js
2.更改About.vue 為Home.vue，Home.vue更改為shop.vue(需要先存檔備份，有許多地方要改，怕出錯)
3.views新增frontend資料夾，把前端東西丟進去(依樣先輩分)

<template>
  <div>
    <div class="wrap">
      <section id="bugQue" class="section_padding">
        <div class="title animated_fadeIn">
          <img class="bug1" src="@/assets/cockroach.png" alt="">
          <h2>您是否也有下困擾，又不知道怎麼解決呢?</h2>
        </div>
        <div class="content animated_fadeIn">
          <div class="spaceBetween">
            <h3>螞蟻怎麼又出現了!</h3>
            <h3>家裡怎麼有這麼多果蠅?</h3>
          </div>
          <img src="@/assets/ant.png" alt="" class="ant">
          <div class="spaceBetween">
            <h3>媽呀!有蟑螂!</h3>
            <h3>怎麼又有蒼蠅!?</h3>
          </div>
        </div>
        <div class="text">
          <i class="fas fa-globe-asia earth"></i>
          <h2>您的聲音，我們聽到了。</h2>
          <p>我們推出一些商品，在生活同時也響應環保!</p>
        </div>
        <div class="mountains">
          <i class="fas fa-mountain m"></i>
          <i class="fas fa-mountain s"></i>
          <i class="fas fa-mountain l"></i>
          <i class="fas fa-mountain s last"></i>
        </div>
      </section>
      <!-- 改成輪撥 -->
      <section id="bugprevent" class="section_padding">
        <div class="title">
          <h2>防蟲專區</h2>
          <h2 class="subtitle">BugPrevent</h2>
        </div>
        <VueSlickCarousel v-bind="settings">
          <div class="cards" v-for="(item) in bugData" :key="item.id">
            <div class="card" v-if="item.category">
              <img :src="item.imageUrl" alt="">
              <div class="text">
                <h2>{{ item.title }}</h2>
                <h3 class="middel">{{ item.content }}</h3>
                <h3>NT${{item.price}}</h3>
              </div>
            </div>
          </div>
        </VueSlickCarousel>
      </section>
      <section id="nature" class="section_padding">
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
      <section id="danger" class="section_padding">
        <img src="@/assets/danger.png" alt="">
        <h2>現在，為滿足人類的需求，大肆的開發環境，造成環境汙染。</h2>
      </section>
      <section id="example" class="section_padding">
        <div class="title">
          <h2>環境的汙染</h2>
        </div>
        <div class="content">
          <img src="@/assets/forest.jpg" alt="">
          <div class="text">
            <h3>森林破壞</h3>
            <p>人為因素的森林破壞包括森林採伐，人類引起森林火災，酸雨和引進的物種。也有自然因素可能會破壞森林，包括森林火災、昆蟲、疾病、天氣、物種之間的競爭等。</p>
          </div>
        </div>
        <div class="content">
          <img src="@/assets/river.jpg" alt="">
          <div class="text">
            <h3>河川汙染</h3>
            <p>水污染正在成為世界死亡和疾病的主要黑手，每天有14,000多人因此喪生。據估算，在印度每天約有580人死於水污染有關的疾病。中國水資源中約有九成被污染。</p>
          </div>
        </div>
        <div class="content">
          <img src="@/assets/air.jpg" alt="">
          <div class="text">
            <h3>空氣汙染</h3>
            <p>空氣污染的一個重要風險因素是導致一系列健康問題，包括呼吸感染、心臟病、慢性阻塞性肺病、中風和肺癌。</p>
          </div>
        </div>
      </section>
      <section id="copperIntro" class="section_padding">
        <div class="title">
          <i class="fas fa-atom"></i>
          <h3>為了愛地球提倡環保，我們致力尋找環保素材。</h3>
          <h2>終於，我們發現了-銅離子</h2>
        </div>
        <div class="intro">
          <img src="@/assets/copperion.png" alt="">
          <h2>什麼是銅離子?</h2>
          <br>
          <p>銅離子抗菌纖維是一種機能性纖維，具有阻斷疾病傳播、消除異味、修復皮膚等效果，是新型的抗菌紡織品。早在2008年，美國環境保護機構(NRDC)就登記核准了五種銅合金用於抗菌材料，這些銅合金可以在2小時內殺滅物體表面99%的細菌。</p>
          <p>銅是人體內本身就含有的生命元素，所以銅離子的化合物都可溶解，進入人體的銅，也進行正常的新陳代謝排出體外，對人體皮膚無刺激性及過敏現象，對人體健康安全無虞。</p>
        </div>
      </section>
      <section id="testTitle" class="section_padding">
        <div class="icons">
          <i class="fas fa-atom"></i>
          <i class="fas fa-plus"></i>
          <i class="far fa-lightbulb lightbulb" ></i>
          <i class="fas fa-equals"></i>
          <i class="fas fa-question"></i>
        </div>
        <h2>然後...我們嘗試在日常使用的物品加入銅離子</h2>
        <h2>發現了驚人的效果!</h2>
      </section>
      <section id="test" class="section_padding">
        <div class="title">
          <h2>什麼驚人的效果呢?</h2>
          <h3>讓我們實驗給您看!</h3>
          <hr>
        </div>
        <div class="contents">
          <div class="content">
            <img src="@/assets/copperion_test.jpg" alt="">
            <div class="text">
              <h2>培養皿測試</h2>
              <p>在培養皿中放入銅離子母片和沒有放入銅離子母片做比較，有銅離子的話，培養皿裡面幾乎沒有受到細菌汙染!</p>
            </div>
          </div>
          <div class="content">
            <img src="@/assets/no_copperion.jpg" alt="">
            <div class="text">
              <h2>未加入銅離子</h2>
              <p>未加入銅離子的商品放在水中，時間久了就會褪色，被細菌汙染，變得醜醜的，耐用性降低很多!</p>
            </div>
          </div>
          <div class="content">
            <img src="@/assets/copperion.jpg" alt="">
            <div class="text">
              <h2>加入銅離子後</h2>
              <p>加入銅離子的商品，不但沒受到細菌汙染，而且還不會退色，保持商品的功能與外觀，並且提升耐用性!  </p>
            </div>
          </div>
        </div>
      </section>
      <section id="copperProductTitle" class="section_padding">
        <div class="text">
          <i class="fas fa-globe-asia earth"></i>
          <h2>為了愛護地球，環保必須從你我做起。</h2>
          <p>我們推出一些商品，在生活同時也響應環保!</p>
        </div>
        <div class="mountains">
          <i class="fas fa-mountain m"></i>
          <i class="fas fa-mountain s"></i>
          <i class="fas fa-mountain l"></i>
          <i class="fas fa-mountain s last"></i>
        </div>
      </section>
      <section id="copperProduct" class="section_padding">
        <div class="title">
          <h2>抗菌專區</h2>
          <h2 class="subtitle">Antibacterial</h2>
        </div>
        <VueSlickCarousel v-bind="settings">
          <div class="cards" v-for="(item) in ionData" :key="item.id">
            <div class="card">
              <img :src="item.imageUrl" alt="">
              <div class="text">
                <h2>{{ item.title }}</h2>
                <h3 class="middel">{{ item.content }}</h3>
                <h3>NT${{item.price}}</h3>
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
  components: { VueSlickCarousel },
  data(){
    return {
      settings:{
        slidesToShow: 2,
        autoplay: true,
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
    $(window).scroll(function(){
      $('.animated_fadeIn').each(function(){
        var scrollPos = $(window).scrollTop()
        var windowHeight = $(window).height()
        var thisPos = $(this).offset().top
        if(thisPos <= (windowHeight + scrollPos)){
          $(this).addClass('fadeIn')
        }
      })
    })
  }
}


</script>



