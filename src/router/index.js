import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Cookie from 'js-cookie'

// 使用懒加载的方式引入
const CommonLayout = () => import('@/components/commonLayout.vue')
const home = () => import('@/views/Home.vue')
const login = () => import('@/views/Login.vue')
const detail = () => import('@/views/detail.vue')
const personal = () => import('@/views/Personal.vue')
const article = () => import('@/views/Article.vue')
const editArticle = () => import('@/views/ArticleEdit.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'CommonLayout',
    component: CommonLayout,
    children:[
      {
      path:'',
      name:'home',
      component:home
      },
      {
        path:'/personal',
        name:'personal',
        component:personal,
        meta:{
          // 需要登录权限
          requireAuth:true
        }
      },
      {
        path:'/detail/:id',
        name:'detail',
        component:detail
      },
      {
        path:'/article',
        name:'article',
        component:article,
        meta:{
          // 需要登录权限
          requireAuth:true
        }
      },
      {
        path:'/article/editArticle/:id',
        name:'editArticle',
        component:editArticle,
        meta:{
          // 需要登录权限
          requireAuth:true
        }
      }
    ]
  },
  {
    path:'/login',
    name:'login',
    component:login
  }
]

const router = new VueRouter({
  routes
})

// 路由守卫 -> 进去路由前
router.beforeEach((to,from,next) => {
  // 由于刷新会丢失登录状态，所以刷新后要从Cookie里获取token再次存放在vuex
   store.commit('setToken',Cookie.get('token'))
  //  判断有无token，有则设置当前状态为登录状态
   if(store.state.token){
    store.commit('changIsSignIn',1)
  }
  //  先判断去的页面是否需要登录权限
  if(to.meta.requireAuth){
    // 判断有没有登录
    if(store.state.token){
      // 有登录直接next
      next()
    }else{
      // 未登录则去登录
      if(to.name === 'login') {
        next()
      } else {
        next({ name: 'login' })
      }
    }
  }else {
    // 不需要登录权限的页面直接next
    next()
  }
   
})

export default router
