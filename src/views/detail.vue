<template>
   <div class="wrapper">
    <el-row :gutter="10" class="head">
          <el-col :xs="23" :sm="23" :md="23" :lg="18" :xl="18">
            <div class="grid-content bg-purple">
              <!-- 文章 -->
              <div class="block">
                <!-- 您的位置 -->
                <location Tit1="首页" Tit2="技术博文"></location>
                <!-- 具体文章 -->
                <article-contents :data="data"></article-contents>
                <!-- 评论 -->
                <comment></comment>
              </div>
            </div>
            </el-col>
          <el-col :xs="1" :sm="1" :md="1" :lg="6" :xl="6">
            <div class="grid-content bg-purple-light synopsis">
              <!-- 最新博文 -->
              <div class="block">
                <!-- 标题 -->
                <title-boxs></title-boxs>
                <!-- 排行列表 -->
                  <ranking-list></ranking-list>         
              </div>
            </div>
            </el-col>
    </el-row>
   </div>
</template>

<script>
import comment from '@/components/Comment.vue'
import location from '../components/Location/location.vue'
import ArticleContents from '../components/ArticleContents/ArticleContents.vue'
import TitleBoxs from '../components/TitleBox/titleBoxs.vue'
import RankingList from '../components/rankingList/rankingList.vue'
  export default {
    // props:['titleArry'],
    components:{
      comment,
      location,
      ArticleContents,
        TitleBoxs,
        RankingList
    },
    data() {
      return {
        id:this.$route.params.id,
        data:{}
      }
    },
    methods:{
      GetArticleDetail(){
        this.$http.get('/api/article/detail',{
          params:{
            article_id:this.id
          }
        }).then(res => {
          console.log(res);
          if(res.data.code === 0 ){
            this.data = res.data.data;
          }
        })
      }
    },
    created(){
      this.GetArticleDetail()

    }
  }
</script>

<style lang="scss" scoped>
.head {
   margin-top: 20px;
}
</style>