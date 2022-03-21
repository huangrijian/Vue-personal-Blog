<template>
  <div class="wow slideInLeft">
    <article-lists :AllArticle="AllArticle" :searchTit="searchTit" :searchCount="searchCount" :isSearch="isSearch"></article-lists>
    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" :current-page="curPage" :page-size="pageSize" :total="count" @current-change="change">
    </el-pagination>
  </div>
</template>

<script>
import scrollTo from '../assets/js/scrollTo.js';
import ArticleLists from '../components/articleLists/ArticleLists.vue';
import { getSingleclassifyRes, getAllCount, searchArticle, getSinglePageArticleList } from '@/network/article';
export default {
  name: 'List',
  components: { ArticleLists },
  data() {
    return {
      AllArticle: [],
      keyword: this.$route.query.keyword,
      classname: this.$route.query.classname,
      // 当前的页，默认为第一页
      curPage: 1,
      // 设置每页的数量
      pageSize: 6,
      // 全部文章数量
      count: 0,

      currentType: 'default',

      // 渲染搜索/点击分类后的检索结果
      searchTit: '',
      searchCount: 0,
      isSearch: false
    }
  },
  // 路由发生变化, 根据类型重新初始化
  beforeRouteUpdate(to, from, next) {
    if (to.query.classname) {
      // 点击分类变动
      this.InitialClassify(to.query.classname)
    } else if (to.query.keyword) {
      // 搜索关键字初始化 --- 即输入关键字后点击搜索
      this.InitialSearch(to.query.keyword)
    } else {
      // 默认初始化 --- 即直接点击`技术博文`
      this.InitialDefault();
    }
    next();
  },
  methods: {
    // 当前路由参数发生变化，根据当前类型获取分页文章
    change(curPage) {
      // 保存当前第几页
      this.curPage = curPage;
      // 根据当前类型获取分页文章
      switch (this.currentType) {
        case 'default':
          // 获取默认类型的分页文章
          this.GetAllArticle(curPage, this.pageSize);
          break;
        case 'search':
          // 获取搜索类型的分页文章
          this.getOnlySearchArticlePage(curPage, this.pageSize);
          break;
        case 'classify':
          this.getOnlyClassifyArticlePage(curPage, this.pageSize);
          break;
      }
      // 跳转顶部
      scrollTo();
    },
    // 默认入口 --- 获取默认的文章分页
    async GetAllArticle(curPage, pageSize) {
      let { data } = await getSinglePageArticleList({ limt: pageSize, offset: (curPage - 1) * pageSize });
      this.AllArticle = data;
    },
    // 搜索入口 --- 获取搜索的文章分页
    async getOnlySearchArticlePage(curPage, pageSize) {
      let { result } = await searchArticle(this.keyword, pageSize, (curPage - 1) * pageSize);
      this.AllArticle = result;
    },

    // 分类入口 --- 获取分类的文章分页
    async getOnlyClassifyArticlePage(curPage, pageSize) {
      let { data, count } = await getSingleclassifyRes(this.classname, pageSize, (curPage - 1) * pageSize);
      this.AllArticle = data.list;
      this.count = count

    },

    renderSearchView(searchTit, searchCount, isSearch) {
      // 给子组件传递数据用于渲染当前的展示结果
      this.searchTit = searchTit;
      this.searchCount = searchCount;
      this.isSearch = isSearch;
    },

    // 初始化搜索类型的获取文章
    InitialSearch(keyword) {
      this.currentType = 'search'
      // 保存最新的关键字
      this.keyword = keyword
      // 初始化分页器
      this.curPage = 1
      // 设置每页的数量
      this.pageSize = 3
      // 全部文章数量
      this.count = this.$store.state.searchResCount;
      this.AllArticle = this.$store.state.searchRes;

      this.renderSearchView(this.keyword, this.count, true)
    },
    // 初始化默认类型的获取文章
    InitialDefault() {
      this.currentType = 'default'; //初始化当前文章类型
      // 初始化分页器
      this.curPage = 1
      // 设置每页的数量
      this.pageSize = 6
      getAllCount().then(({ count }) => {
        this.count = count//初始化全部文章数量
        // 给子组件传递数据用于渲染当前的展示结果
        this.renderSearchView('', 0, false)
      })
      // 获取 默认第一页文章
      this.GetAllArticle(this.curPage, this.pageSize);
    },
    // 初始化分类类型的获取文章
    InitialClassify(classname) {

      this.currentType = 'classify'; //初始化当前文章类型
      // 保存最新的分类名称
      this.classname = classname
      this.curPage = 1; // 初始化第一页
      this.pageSize = 3; //初始化每页显示数量
      getSingleclassifyRes(classname).then(({ data, count }) => {
        // 获取 默认第一页文章
        this.AllArticle = data.list;
        // 获取总数
        this.count = count;
        // 给子组件传递数据用于渲染当前的展示结果
        this.renderSearchView(classname, count, true)
      })

    }

  },
  created() {
    // 搜索关键词入口
    if (this.keyword) return this.InitialSearch(this.keyword);
    // 点击分类入口
    if (this.classname) return this.InitialClassify(this.classname);
    //默认入口
    this.InitialDefault();
  },
  mounted() {
    this.$animation();
  }
}
</script>

<style lang="scss" scoped>
.el-pagination {
  margin-top: 15px;
  display: flex;
  justify-content: center;
}
.active {
  display: none;
}
</style>