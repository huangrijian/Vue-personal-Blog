import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

// 使用懒加载的方式引入
// 首屏代码不要异步加载
import Home from '@/views/Home.vue'
// 异步加载非首屏页面
const CommonLayout = () => import('@/components/commonLayout.vue')
const login = () => import('@/views/Login.vue')
const detail = () => import('@/views/detail.vue')
const personal = () => import('@/views/Personal.vue')
const article = () => import('@/views/Article.vue')
const editArticle = () => import('@/views/ArticleEdit.vue')
const Lists = () => import('@/views/List.vue')
const timeLocus = () => import('@/views/timeLocus.vue')
const photoWall = () => import('@/views/photoWall.vue')
const aboutMe = () => import('@/views/aboutMe.vue')
const recommend = () => import('@/views/recommend.vue')
const LeaveWord = () => import('@/views/LeaveWord.vue')
const LearningPath = () => import('@/views/LearningPath.vue')
const MusicDetail = () => import('@/views/MusicDetail.vue')
const silinsi = () => import('@/views/404.vue')


// 同一路由跳转的报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: CommonLayout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home
      },
      {
        path: '/Lists',
        name: 'Lists',
        component: Lists
      },
      {
        path: '/musicDetail/:id',
        name: 'MusicDetail',
        component: MusicDetail
      },
      {
        path: '/personal',
        name: 'personal',
        component: personal,
        meta: {
          // 需要登录权限
          requireAuth: true
        }
      },
      {
        path: '/LeaveWord',
        name: 'LeaveWord',
        component: LeaveWord
      },
      {
        path: '/aboutMe',
        name: 'aboutMe',
        component: aboutMe
      },
      {
        path: '/recommend',
        name: 'recommend',
        component: recommend
      },
      {
        path: '/timeLocus',
        name: 'timeLocus',
        component: timeLocus
      },
      {
        path: '/photoWall',
        name: 'photoWall',
        component: photoWall,
        meta: {
          isPure: true
        }
      },
      {
        path: '/detail/:id',
        name: 'detail',
        component: detail
      },
      {
        path: '/article',
        name: 'article',
        component: article,
        meta: {
          // 需要登录权限
          requireAuth: true
        }
      }
    ]
  },
  {
    path: '/LearningPath',
    name: 'LearningPath',
    component: LearningPath
  },
  {
    path: '/article/editArticle/:id/:type',
    name: 'editArticle',
    component: editArticle,
    meta: {
      // 需要登录权限
      requireAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/404',
    name: '404',
    component: silinsi
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

function backTop() {
  window.pageYOffset = document.documentElement.scrollTop = 0;
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  scrollTo(0, 0);
  document.documentElement.scrollTop = document.body.scrollTop = 0
}

// 路由守卫 -> 进去路由前
router.beforeEach((to, from, next) => {
  // 让页面回到顶部
  backTop();
  to.meta.isPure ? store.commit('setIsPure', true) : store.commit('setIsPure', false)
  //  先判断去的页面是否需要登录权限
  if (!to.meta.requireAuth) return next();
  if (!store.state.token) return next({ name: 'login' });
  if (to.name !== 'article' && to.name !== 'editArticle') return next();
  // 去我的博客之前拦截，判断当前用户是否为管理员，如果是管理员，则next()
  let grade = sessionStorage.getItem("grade");
  if (grade === '3') return next({ name: 'home' });
  next()
})

export default router
