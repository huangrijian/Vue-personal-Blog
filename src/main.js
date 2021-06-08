import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入基础样式
import '@/assets/scss/reset.scss'
import '@/assets/font/iconfont.css'
// 引入公共样式
import '@/assets/scss/common.scss'
// 引入loadding加载动画的样式
import '@/assets/scss/loadding.scss'
// 引入移动端样式
import '@/assets/scss/mobile.scss'

// 引入文本编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

import 'wowjs/css/libs/animate.css'

// 引入图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)


import '@/assets/js/top.js'

import setAxios from './network/index.js'
setAxios()

// 导入axios
import axios from 'axios'
// 全局配置  挂载到vue的原型对象上  这样每个vue组件都可以通过this.$http 使用axios
Vue.prototype.$http = axios;

// 导入
import store from './store/index.js'
// 挂载到Vue实例上，全局可通过this.$store进行调用
Vue.prototype.$store = store

// 注册全局事件 --- 事件总线
Vue.prototype.$EventBus = new Vue()

Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
