<template>
  <div class="block">
    <el-timeline reverse="true">
      <el-timeline-item :timestamp="item.create_time" placement="top" :key="index" v-for="(item,index) in AllArticle">
        <el-card>
          <span class="title">{{item.title}}</span>
            <mavon-editor v-model="item.content"
                defaultOpen="preview"
              :toolbarsFlag="false"
              :subfield="false"
              codeStyle="monokai"
              :boxShadow="false"
              :ishljs="true"
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
    name:'timeLocus',
    inject: ['reload'],
    data() {
      return {
        AllArticle:[],
        state:this.$store.state.timeLocus
      }
    },
    methods:{
        // 获取所有文章
      GetAllArticle(){
      // this.$http.get('/api/article/typeList',{params:{type:1}}).then(res => {
      //     if(res.data.code === 0){
      //       // 获取文章数组
      //       this.AllArticle = res.data.data
      //       console.log(this.AllArticle);
      //     }
      // })

      this.$http.get('/api/speech/getSpeech').then(res => {
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
    },
    activated(){
      if(this.$store.state.timeLocus == 1){
        // 为1说明当前文章数据被刷新了，需要重新刷新当前组件
        this.reload();
        this.$store.commit('changeTimeLocus',0)
      }
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