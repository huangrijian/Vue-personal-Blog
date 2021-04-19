<template>
  <div>
    <article-lists :AllArticle="AllArticle"></article-lists>
    <div class="wrapper pagination">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
          <div class="grid-content bg-purple pagination-s">
           <!-- 分页 -->
                  <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="count"
                    @current-change="change"
                    >
                  </el-pagination>
          </div>
        </el-col>
        <el-col :lg="6" :xl="6">
          <div class="grid-content bg-purple-light synopsis">
          </div>
        </el-col>
      </el-row>
    </div>        
  </div>
</template>

<script>
import ArticleLists from '../components/articleLists/ArticleLists.vue'
  export default {
  components: { ArticleLists },
  data() {
    return {
      AllArticle:[],
      key:this.$route.query.key,
      // 当前的页，默认为第一页
      curPage:1,
      // 设置每页的数量
      pageSize:10,
      // 全部文章数量
      count:''
    }
  },
  methods:{
    change(val){
      this.GetAllArticle(val,this.pageSize);

    },
    GetAllArticle(curPage,pageSize){
      if(this.key){
        // 获取分类文章信息
        this.$http.get('/api/article/list/Singleclassify',{params:{classname:this.key}}).then(res => {
        if(res.data.code === 0){
          // 获取文章数组
          this.AllArticle = res.data.data.list;
          console.log("获取分类文章信息",this.AllArticle);
        }
      })
      }else {
        // 获取全部文章信息
        this.$http.get('/api/article/typeList',{params:{curPage:curPage,pageSize:pageSize}}).then(res => {
        if(res.data.code === 0){
          // 获取文章数组
          this.AllArticle = res.data.data;
          this.count =  res.data.coust
        }
      })
      }
     
    },
  },
  created(){
    // 分页请求
    this.GetAllArticle(this.curPage,this.pageSize);
  }
  }
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: 15px;
  .pagination-s {
    display: flex;
    justify-content: center;
  }

}
</style>