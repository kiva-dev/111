import App from './App'
import messages from './locale/index'
let i18nConfig = {
  locale: uni.getLocale(),
  messages
}
// #ifndef VUE3
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n(i18nConfig)
console.log(i18n.locale);
uni.setStorageSync('locale', i18n.locale)
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
// 防止多次点击
import common from './common/common.js'
Vue.prototype.$noMultipleClicks = common.noMultipleClicks;
import filters from 'common/filters.js'
Vue.prototype.$filter = filters
import ryGlobalData from './common/libs/chatInit.js'
// console.log(ryGlobalData.toString(),'ryGlobalData')
Vue.prototype.ryGlobalData = ryGlobalData
import store from '@/store';
//引入融云SDK
const RongIMib = require('./common/libs/RongIMLib-3.0.7.1-dev.js')
const RongIMLib = require('./common/libs/RongEmoji-2.2.9.js')

// 设置H5端的宽度
if (window.screen.width >= 768) {
  document.documentElement.style.width = window.screen.width + 'px';
}

//初始化融云SDK
let im = RongIMib.init({
  appkey: "kj7swf8okxfe2"//申请的key
  // appkey: 'c9kqb3rdc6elj'
})
Vue.prototype.$Im = im
//挂载融云到Vue原型
Vue.prototype.$RongIMib = RongIMib
Vue.prototype.$RongIMLib = RongIMLib

// 接口
import http from './http/index'
import apiObj from './http/api.js'
Vue.prototype.$http = http
Vue.prototype.$apiObj = apiObj
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  store,
  i18n,
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import { createI18n } from 'vue-i18n'
export function createApp () {
  const app = createSSRApp(App)
  app.use(i18n)
  return {
    app
  }
}
// #endif