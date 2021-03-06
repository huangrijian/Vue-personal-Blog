// 导入vue及vuex
import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'js-cookie'
// 挂载vuex
Vue.use(Vuex)

// 创建vuex对象并向外暴露
export default new Vuex.Store({
  // 全局属性变量
  state: {
    //  isSignIn 登录状态，0为未登录, 1为已登录
    isSignIn: Cookie.get('token') ? 1 : 0,
    token: Cookie.get('token'),

    isPure: false,

    // 时间轴状态，默认0为缓存状态，1为活跃状态
    timeLocus: 0,

    // 所有文章标题
    articleTitle: [],

    // 推荐排行
    RecommendArry: JSON.parse(sessionStorage.getItem('RecommendArry')),
    // 点赞排行
    LikeArry: JSON.parse(sessionStorage.getItem('LikeArry')),

    // 搜索结果
    searchRes: JSON.parse(sessionStorage.getItem('setSearchRes')) || [],

    bgimgUrl: sessionStorage.getItem('bgimgUrl') || require('../assets/img/bgdm04.jpg'),

    codeStyle: sessionStorage.getItem('codeStyle') || 'shades-of-purple',

    searchResCount: Number(sessionStorage.getItem('searchResCount'))
  },
  // 全局同步方法, 调用方法,this.$store.commit("xxx")
  mutations: {
    changIsSignIn(state, n) {
      state.isSignIn = n;
    },
    setToken(state, val) {
      state.token = val;
    },
    // 推荐排行
    setRecommendArry(state, val) {
      state.RecommendArry = val;
      sessionStorage.setItem("RecommendArry", JSON.stringify(val));
    },
    // 改变时间轴状态
    changeTimeLocus(state, val) {
      state.timeLocus = val;
    },
    // 点赞排行
    setLikeArry(state, val) {
      state.LikeArry = val;
      sessionStorage.setItem("LikeArry", JSON.stringify(val));
    },
    // 搜索结果
    setSearchRes(state, val) {
      state.searchRes = val;
      sessionStorage.setItem("setSearchRes", JSON.stringify(val));
    },

    setIsPure(state, val) {
      state.isPure = val;
    },

    setBgimgUrl(state, val) {
      state.bgimgUrl = val;
      sessionStorage.setItem("bgimgUrl", val);
    },
    setCodeStyle(state, val) {
      state.codeStyle = val;
      sessionStorage.setItem("codeStyle", val);
    },
    setSearchResCount(state, val) {
      state.searchResCount = val;
      sessionStorage.setItem("searchResCount", val);
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
