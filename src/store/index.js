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

    // 所有文章标题
    articleTitle:[]
  },
  // 全局同步方法, 调用方法,this.$store.commit("xxx")
  mutations: {
    changIsSignIn (state,n){
      state.isSignIn = n;
    },
    setToken(state,val) {
      state.token = val;
    },

    setArticleTitle(state,val) {
      state.articleTitle = val;
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
