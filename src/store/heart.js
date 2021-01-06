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
      const index = state.myFavorite.findIndex(function (item) {
        return item === id
      })
      if (index === -1) {
        state.myFavorite.push(id)
      } else {
        state.myFavorite.splice(index, 1)
      }
      localStorage.setItem('myFavorite', JSON.stringify(state.myFavorite))
      console.log('加入成功',state.myFavorite)
    },
  },
  getters: {
    myFavorite: state => state.myFavorite,
    products: state => state.products
  }
}
