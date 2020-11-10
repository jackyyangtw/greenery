<template>
  <div>
    <!-- 啟用loading效果 -->
    <loading :active.sync="isLoading"></loading>
    <!-- 建立新產品 -->
    <div class="text-right">
      <button class="btn btn-primary" @click="openModal(true)">建立新產品</button>
    </div>
    <!-- 商品表單 -->
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="100">分類</th>
          <th>產品名稱</th>
          <th width="80">售價</th>
          <th width="80">特價</th>
          <th width="100">啟用與否</th>
          <th width="100">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td> {{item.title}} </td>
          <td class="text-left">
            {{item.origin_price | currency}}
          </td>
          <td class="text-left">
            {{item.price | currency}}
          </td>
          <td>
            <!-- //is_enabled? -->
            <span class="text-success" v-if="item.is_enabled">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click="openModal(false,item)">編輯</button>
            <button class="btn btn-outline-primary btn-sm" @click="deletItem(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 頁面切換 -->
    <Switchpages :pages='pagination' @switch="getProducts"></Switchpages>
    <!-- 商品modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input type="text" class="form-control" id="image"
                    v-model="tempProduct.imageUrl"
                    placeholder="請輸入圖片連結">
                </div>
                <div class="form-group">
                  <label for="customFile">或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                  </label>
                  <!-- @change 當欄位有變更的時候 -->
                  <input type="file" id="customFile" class="form-control"
                    ref="files" @change="uploadFile">
                </div>
                <img :src="tempProduct.imageUrl" img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid" alt="">
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title"
                    placeholder="請輸入標題" v-model="tempProduct.title">
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input type="text" class="form-control" id="category"
                      placeholder="請輸入分類" v-model="tempProduct.category">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input type="unit" class="form-control" id="unit"
                      placeholder="請輸入單位" v-model="tempProduct.unit">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                    <input type="number" class="form-control" id="origin_price"
                      placeholder="請輸入原價" v-model="tempProduct.origin_price">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input type="number" class="form-control" id="price"
                      placeholder="請輸入售價" v-model="tempProduct.price">
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea type="text" class="form-control" id="description"
                    placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea type="text" class="form-control" id="content"
                    placeholder="請輸入產品說明內容" v-model="tempProduct.content"></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                      id="is_enabled"
                      :true-value="1"
                      :false-value="0" 
                      v-model="tempProduct.is_enabled">
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 刪除modal -->
    <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger sureDelete" @click="deletItemSure"
              >確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>   

<script>
//沒載入會出錯
import $ from 'jquery'
import Switchpages from "@/components/Switchpages"

//可匯出供其他元件使用
export default {
  components: {
    Switchpages
  },
  data(){
    return{
      //分頁
      pagination: {},
      //產品陣列
      products:[],
      //Modal的物件
      tempProduct:{},
      //判斷Modal是新增或
      isNew: false,
      isLoading: false,
      //局部loading
      status: {
        fileUploading: false
      }
    }
  },
  methods: {
    //page = 1預設是第一頁
    getProducts(page = 1){
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`
      const vm = this
      vm.isLoading = true
      this.$http.get(api).then((response)=>{
        console.log(response.data)
        vm.isLoading = false 
        vm.products = response.data.products
        vm.pagination = response.data.pagination
      })
    },
    //item將點選的物件存起來
    deletItem(item){
      this.tempProduct = item
      $("#delProductModal").modal("show")
    },
    deletItemSure(){
      const vm = this
      const deletapi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
      this.$http.delete(deletapi).then((response)=>{
        console.log(response)
        if(response.data.success){
          $("#delProductModal").modal("hide")
          vm.getProducts()
        }else{
          $("#delProductModal").modal("hide")
          vm.getProducts()
          console.log("刪除失敗")
        }
      })        
    },
    //用於"新增商品"還有"編輯商品"
    openModal(isNew,item){
      console.log("這是item",item)
      //是新增的話
      if(isNew){
        this.tempProduct = {}
        this.isNew = true
        //編輯產品的話
      } else {
        //這樣的寫法兩個值會一樣(物件傳參考)
        // this.tempProduct = item
        //避免物件傳參考，並且將item寫入空物件(ES6)
        this.tempProduct = Object.assign({},item)
        this.isNew = false
      }
      $("#productModal").modal('show')
    },
    //用於關閉modal
    updateProduct(){
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`
      //更新商品資訊，要用post方法送出物件
      let httpMethod = 'post'
      const vm = this
      //如果不是新的話(修改產品)
      if(!vm.isNew){
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
        //修改產品時操作api的方式變成put
        httpMethod = 'put'
      }
      //將tempProduct的資料新增到後端資料庫
      //data要用物件裝起來不能只傳vm.tempProduct(詳見管理控制台/商品建立)
      this.$http[httpMethod](api,{ data: vm.tempProduct }).then((response)=>{
        console.log(response.data)
        if(response.data.success){
          $("#productModal").modal('hide')
          vm.getProducts()
        }else{
          $("#productModal").modal('hide')
          vm.getProducts()
          console.log('更新失敗')          
        }
      })
      // this.$http.delete(api).then((response)=>{
      //   console.log(response)
      // })     
    },
    uploadFile(){
      console.log(this)
      //取出上傳檔案
      const uploadedFile = this.$refs.files.files[0]
      const vm = this
      vm.status.fileUploading = true
      //FormData 是web api 建立新物件
      //https://developer.mozilla.org/zh-TW/docs/Web/API/FormData
      const formData = new FormData()
      //新增的欄位,檔案
      //file-to-upload <input type="file" name="file-to-upload"> 上傳表單的欄位
      formData.append('file-to-upload',uploadedFile)
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`
      this.$http.post(url,formData,{
        // Content-type 表頭資訊 (header) 是指告訴客戶端實際返回的內容的內容類型
        //傳送「檔案」必須使用表單的形式
        //所以在此把傳送的類型改為 form-data
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response)=>{
        //loading效果取消
        vm.status.fileUploading = false
        console.log(response.data)
        //這樣子不會真正寫入
        // vm.tempProduct.imageUrl = response.data.imageUrl
        // console.log(vm.tempProduct)
        //$set(要寫入的地方,欄位,寫入的東西)
        if(response.data.success){
          vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl)
          console.log(vm.tempProduct)
        } else {
          this.$bus.$emit('message:push',response.data.message,'danger')
        }
      })
    }
  },
  created() {
    this.getProducts()
    // this.$bus.$emit('message:push','這是一段訊息','warning')
  }
}
</script>