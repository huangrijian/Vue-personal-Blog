// 导入vue及vuex
import Vue from 'vue'
import Vuex from 'vuex'
// 挂载vuex
Vue.use(Vuex)

// 创建vuex对象并向外暴露
export default new Vuex.Store({
  // 全局属性变量
  state: {
    //  isSignIn 登录状态，0为未登录
    isSignIn:0,
    token:'',

    // 时间轴状态，默认0为缓存状态，1为活跃状态
    timeLocus:0,

    // 所有文章标题
    articleTitle:[],

    titArry : JSON.parse(sessionStorage.getItem('titleArry')),
    titleidArry : JSON.parse(sessionStorage.getItem('titleidArry')),

  },
  // 全局同步方法, 调用方法,this.$store.commit("xxx")
  mutations: {
    changIsSignIn (state,n){
      state.isSignIn = n;
    },
    setToken(state,val) {
      state.token = val;
    },
    // 最新推荐标题
    setTitArry(state,val) {
      state.titArry = val;
      sessionStorage.setItem("titleArry", JSON.stringify(val));
    },
    // 最新推荐标题id
    setTitleidArry(state,val) {
      state.titleidArry = val;
      sessionStorage.setItem("titleidArry", JSON.stringify(val));
    },
    changeTimeLocus(state,val){
      state.timeLocus = val;
    }
  },
  // 异步方法 调用方法,this.$store.dispatch("xxx") 
  actions: {
  },
  // Vuex属性计算,在视图里面当变量使用
  getters: {
  },
  // 模块化注册
  modules: {
  }
})
