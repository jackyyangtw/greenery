export default{
  namespaced: true,
  strict: true,
  state: {
    myFavorite: JSON.parse(localStorage.getItem('myFavorite')) || [],
    products: [],
  },
  actions: {
    addMyFavorite (context, id) {
      context.commit('ADD_MYFAVORITE', id)
    }
  },
  mutations: {
    ADD_MYFAVORITE (state, id) {
      state.products.forEach(function (item) {
        if (item.id === id) {
          item.isLike = !item.isLike
        }
      })
      //找出state.myFavorite陣列中與id相同id的索引
      const index = state.myFavorite.findIndex(function (item) {
        return item === id
      })
      //找不到的話就push id 到 myFavorite
      if (index === -1) {
        state.myFavorite.push(id)
      } else {
        //找到的話就刪除
        state.myFavorite.splice(index, 1)
      }
      //將state.myFavorite變成JSON自存到localStorage
      localStorage.setItem('myFavorite', JSON.stringify(state.myFavorite))
      console.log('加入成功',state.myFavorite)
    },
  },
  getters: {
    myFavorite: state => state.myFavorite,
    products: state => state.products
  }
}
