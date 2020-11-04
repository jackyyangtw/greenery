import Vue from "vue"

//直接掛載event bus在vue的原型下，可以直接呼叫
Vue.prototype.$bus = new Vue()