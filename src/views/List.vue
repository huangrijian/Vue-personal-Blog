<template>
  <div>
    <article-lists :AllArticle="AllArticle"></article-lists>
  </div>
</template>

<script>
import ArticleLists from '../components/articleLists/ArticleLists.vue'
  export default {
  components: { ArticleLists },
  data() {
    return {
      AllArticle:[],
      key:this.$route.query.key
    }
  },
  methods:{
    GetAllArticle(){
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
        this.$http.get('/api/article/allList').then(res => {
        if(res.data.code === 0){
          // 获取文章数组
          this.AllArticle = res.data.data;
        }
      })
      }
     
    },
  },
  created(){
    this.GetAllArticle();
    console.log(this.key);
  }
  }
</script>

<style lang="scss" scoped>

</style>