//詢問助教該怎麼在vuex註冊事件
//如果太麻煩就用openmodal的方式
export default{
  namespaced: true,
  strict: true,
  state: {
    messages:[]
  },
  actions: {
    updateMessage(context,{message, status}) {
      context.commit('MESSAGE',{ message,status })
      const timestamp = Math.floor(new Date() / 1000);
      context.dispatch('removeMessageWithTiming',timestamp)
    },
    //按下X關掉
    removeMessage(context,num) {
      context.commit('REMOVEMESSAGE', num);
    },
    removeMessageWithTiming(context,timestamp) {
      setTimeout(() => {
        context.state.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            context.state.messages.splice(i, 1);
          }
        });
      }, 5000);
    },
  },
  mutations: {
    MESSAGE(state,{message,status}) {
      const timestamp = Math.floor(new Date() / 1000);
      state.messages.push({
        message,
        status,
        timestamp,
      });
    },
    REMOVEMESSAGE(state, num) {
      state.messages.splice(num, 1);
    },
  },
  getters: {
    messages: state => state.messages
  }
}