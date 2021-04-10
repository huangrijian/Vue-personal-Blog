<template>
  <div class="blog-content-box">
    <div class="wrapper">
      <h1 class="title">{{data.title}}</h1>
      <div class="time">
        <span class="date"><i class="iconfont icon-date">{{data.create_time}}</i></span>
      </div>
      <div class="detail">
        <mavon-editor v-model="data.content"
          defaultOpen="preview"
          :toolbarsFlag="false"
          :subfield="false">
        </mavon-editor>
      </div>
      <comment></comment>
    </div>
  </div>
</template>

<script>
import comment from '@/components/Comment.vue'
  export default {
    components:{
      comment
    },
    data() {
      return {
        content:`xx`,
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

</style>