<template>
  <div class="home">
    <div class="wrapper">
      <div class="main">
        <blog-list :key="index" 
        v-for="(item,index) in AllArticle" 
        :title="item.title"
        :create_time="item.create_time"
        :article_id="item.id"
        >
        </blog-list>
      </div>
    </div>
  </div>
</template>

<script>
import BlogList from '../components/BlogList.vue'
export default {
  name: 'Home',
  components: {
    BlogList
  },
  data() {
    return {
      AllArticle:[]
    }
  },
  methods:{
    GetAllArticle(){
      this.$http.get('/api/article/allList').then(res => {
        if(res.data.code === 0){
          console.log(res.data);
          this.AllArticle = res.data.data
          console.log(this.AllArticle);
        }
      })
    }
  },
  created(){
    this.GetAllArticle()
  }
}
</script>

<style lang="scss" scoped>
.main {
  margin-top: 10px;
  background-color:#f8f8f8;
  padding: 20px;
  border: 1px solid #f0eded;
}
</style>
