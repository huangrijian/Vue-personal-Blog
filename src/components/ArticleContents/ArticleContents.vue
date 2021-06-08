<template>
  <div>
    <h2>{{data.title}}</h2>
      <div class="timeBox">
        <span v-if="data.create_time" class="timer"><i class="iconfont icon-date"></i>{{data.create_time | timer()}}</span>
        <span><i class="el-icon-view"></i>{{data.visited}}</span>
      </div>
      <!-- 具体文章内容 -->
      <div class="detail">
        <mavon-editor v-model="data.content"
          defaultOpen="preview"
          :toolbarsFlag="false"
          :subfield="false"
          codeStyle="atom-one-dark"
          :boxShadow="false"
          >
        </mavon-editor>
      </div>
  </div>
</template>

<script>
  export default {
    props:['data'],
    filters:{
      timer(str){
        return str.substring(0,9);
      },
    },
    created(){
      console.log(this.data);
    }
  }
</script>

<style lang="scss" scoped>
.timer {
  margin-right: 15px;
}
.timeBox {
  margin-bottom: 20px;
}
i {
  margin-right: 5px;
}
h2 {
  font-size: 25px;
  font-weight: 550;
  margin: 20px 0;
}

</style>