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
const Lists = () => import('@/views/List.vue')
const timeLocus = () => import('@/views/timeLocus.vue')
const aboutMe = () => import('@/views/aboutMe.vue')
const recommend = () => import('@/views/recommend.vue')
const LeaveWord = () => import('@/views/LeaveWord.vue')
const LearningPath = () => import('@/views/LearningPath.vue')
const silinsi = () => import('@/views/404.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: CommonLayout,
    children:[
      {
        path:'',
        name:'home',
        component:home
      },
      {
        path:'/Lists',
        name:'Lists',
        component:Lists
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
        path:'/LeaveWord',
        name:'LeaveWord',
        component:LeaveWord
      },
      {
        path:'/aboutMe',
        name:'aboutMe',
        component:aboutMe
      },
      {
        path:'/recommend',
        name:'recommend',
        component:recommend
      },
     
      {
        path:'/timeLocus',
        name:'timeLocus',
        component:timeLocus
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
      }
    ]
  },
  {
    path:'/LearningPath',
    name:'LearningPath',
    component:LearningPath
  },
  {
    path:'/article/editArticle/:id',
    name:'editArticle',
    component:editArticle,
    meta:{
      // 需要登录权限
      requireAuth:true
    }
  },
  {
    path:'/login',
    name:'login',
    component:login
  },
  {
    path:'/404',
    name:'404',
    component:silinsi
  },
  // 错误地址重定向
  {
    path: "*",
    redirect: "/404"
 }
]

const router = new VueRouter({
  routes
})

// 路由守卫 -> 进去路由前
router.beforeEach((to,from,next) => {
   // 让页面回到顶部
  //  pc端直接返回
  window.pageYOffset = document.documentElement.scrollTop = 0;
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  scrollTo(0,0);
  document.documentElement.scrollTop = document.body.scrollTop =0;

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
      // 有登录 ,则判断去的路由是否为 我的博客
        // 去我的博客之前拦截，判断当前用户是否为管理员，如果是管理员，则next()
          if(to.name === 'article'){
              let nickname =  sessionStorage.getItem("nickname");
              if(nickname === '怪蜀黍'){
                next()
              }else {
                // 否则直接返回到home页面
                next({ name: 'home' })
              }
          }else {
            next()
          }
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
