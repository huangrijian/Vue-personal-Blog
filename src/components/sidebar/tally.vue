<template>
  <div>
    <!-- 文章分类标签 -->
    <div class="block" id="tally">
      <h4 style="margin-bottom:15px">文章分类</h4>
      <el-tag v-show="(item.classname)" :key="index" v-for="(item,index) in AllArticleClassName" @click="GotoList(item.classname)">{{item.classname}}</el-tag>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
         AllArticleClassName:[],
      }
    },
    methods:{
          // 获取所有文章分类
      GetAllArticleClassName(){
        this.$http.get('/api/article/classify').then(res => {
          if(res.data.code === 0){
            console.log(res.data);
            this.AllArticleClassName = res.data.data
            // 获取文章分类后，获取文章数据
            // this.GetAllArticle();
          }
        })
      },
      // 点击标签去列表
      GotoList(key){
        this.$router.push({name:'Lists',query: {key}})
      }
    },
    created(){
      this.GetAllArticleClassName()
    }
  }
</script>

<style lang="scss" scoped>
.el-tag {
  margin: 6px;
  cursor:pointer;
}
</style>