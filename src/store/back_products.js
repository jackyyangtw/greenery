//commit mutation
//dispatch action
import axios from 'axios'

export default{
  namespaced: true,
  strict: true,
  state: {
    pagination: {},
    //產品陣列
    products:[],
    //Modal的物件
    tempProduct:{},
    //判斷Modal是新增或
    isNew: false,
    //局部loading
    status: {
      fileUploading: false
    }
  },
  mutations: {
    PAGINATION(state,payload){
      state.pagination = payload
    },
    PRODUCTS(state,payload){
      state.products = payload
    },
    TEMPPOODUCT(state,payload){
      state.tempProduct = payload
    },
    ISNEW(state,payload){
      state.isNew = payload
    },
    STATUS(state,payload){
      state.status = payload
    }
  },
  getters:{

  },
  actions: {
    //page = 1預設是第一頁
    getProducts(context,page = 1){
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`
      context.commit('LOADING',true , { root: true })
      axios.get(api).then((response)=>{
        console.log(response.data)
        context.commit('LOADING',true , { root: false })
        context.commit('PRODUCTS',response.data.products) 
        context.commit('PAGINATION',response.data.pagination)
      })
    },
    //item將點選的物件存起來
    deletItem(context,item){
      context.commit('TEMPPOODUCT',item) 
      // this.tempProduct = item
      $("#delProductModal").modal("show")
    },
    deletItemSure(){
      const deletapi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
      axios.delete(deletapi).then((response)=>{
        console.log(response)
        if(response.data.success){
          $("#delProductModal").modal("hide")
          context.dispatch('getProducts')
        }else{
          $("#delProductModal").modal("hide")
          context.dispatch('getProducts')
          console.log("刪除失敗")
        }
      })        
    },
    //用於"新增商品"還有"編輯商品"
    openModal(context,{isNew,item}){
      console.log("這是item",item)
      //是新增的話
      if(isNew){
        context.commit('TEMPPOODUCT',{})
        context.commit('ISNEW',true)
        //編輯產品的話
      } else {
        //這樣的寫法兩個值會一樣(物件傳參考)
        // this.tempProduct = item
        //避免物件傳參考，並且將item寫入空物件(ES6)
        context.commit('TEMPPOODUCT',Object.assign({},item))
        context.commit('ISNEW',false)
      }
      $("#productModal").modal('show')
    },
    //用於關閉modal
    updateProduct(){
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`
      //更新商品資訊，要用post方法送出物件
      let httpMethod = 'post'
      //如果不是新的話(修改產品)
      if(!isNew){
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
        //修改產品時操作api的方式變成put
        httpMethod = 'put'
      }
      //將tempProduct的資料新增到後端資料庫
      //data要用物件裝起來不能只傳vm.tempProduct(詳見管理控制台/商品建立)
      axios[httpMethod](api,{ data: vm.tempProduct }).then((response)=>{
        console.log(response.data)
        if(response.data.success){
          $("#productModal").modal('hide')
          context.dispatch('getProducts')
        }else{
          $("#productModal").modal('hide')
          context.dispatch('getProducts')
          console.log('更新失敗')          
        }
      })
      // axios.delete(api).then((response)=>{
      //   console.log(response)
      // })     
    },
    uploadFile(context){
      console.log(this)
      //取出上傳檔案
      const uploadedFile = context.$refs.files.files[0]
      context.commit('STATUS',true)
      // vm.status.fileUploading = true
      //FormData 是web api 建立新物件
      //https://developer.mozilla.org/zh-TW/docs/Web/API/FormData
      const formData = new FormData()
      //新增的欄位,檔案
      //file-to-upload <input type="file" name="file-to-upload"> 上傳表單的欄位
      formData.append('file-to-upload',uploadedFile)
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`
      axios.post(url,formData,{
        // Content-type 表頭資訊 (header) 是指告訴客戶端實際返回的內容的內容類型
        //傳送「檔案」必須使用表單的形式
        //所以在此把傳送的類型改為 form-data
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response)=>{
        //loading效果取消
        context.commit('STATUS',false)
        console.log(response.data)
        //這樣子不會真正寫入
        // vm.tempProduct.imageUrl = response.data.imageUrl
        // console.log(vm.tempProduct)
        //$set(要寫入的地方,欄位,寫入的東西)
        if(response.data.success){
          context.$set(context.tempProduct, 'imageUrl', response.data.imageUrl)
          // vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl)
          console.log(context.tempProduct)
        } else {
          context.$bus.$emit('message:push',response.data.message,'danger')
        }
      })
    }
  },
}