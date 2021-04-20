<template>
  <div class="block">
    <el-timeline reverse="true">
      <el-timeline-item v-show="item.type == 1" :timestamp="item.create_time" placement="top" :key="index" v-for="(item,index) in AllArticle">
        <el-card>
          <span class="title">{{item.title}}</span>
            <mavon-editor v-model="item.content"
                defaultOpen="preview"
              :toolbarsFlag="false"
              :subfield="false"
              codeStyle="atom-one-dark"
              :boxShadow="false"
              >
            </mavon-editor>
          <p v-if="item.create_time">黄先森  {{item.create_time}}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>    
</template>

<script>
  export default {
    data() {
      return {
        AllArticle:[],
      }
    },
    methods:{
        // 获取所有文章
      GetAllArticle(){
      this.$http.get('/api/article/typeList',{params:{type:1}}).then(res => {
          if(res.data.code === 0){
            // 获取文章数组
            this.AllArticle = res.data.data
            console.log(this.AllArticle);
          }
      })
      }
    },
    created(){
      this.GetAllArticle();
    }
  }
</script>

<style lang="scss" scoped>
.title {
  font-size: 16px;
  font-weight: 600;
}
.content {
  margin: 20px 0;
}
</style>