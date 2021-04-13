<template>
  <div>
    <ul>
      <li :key="index"  @click="handle(titleidArry[index])"  v-for="(item,index) in titArry"><span>{{index + 1}}</span>{{item}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    inject: ['reload'],
    data() {
      return {
        titArry : this.$store.state.articleTitle,
        titleidArry : []
      }
    },
    methods:{
      handle(id) {
        console.log(id);
        // this.$r
        this.$router.push({name:'detail',params: {id:id}})
        this.reload()
      }
    },
    mounted(){
      // 将sessionStorage上的文章标题列表和id取出
      this.titArry = JSON.parse(sessionStorage.getItem('titleArry'));
      this.titleidArry = JSON.parse(sessionStorage.getItem('titleidArry'));
    }
  }
</script>

<style lang="scss" scoped>
ul {
  li {
    display: flex;
    margin: 10px 0;
    font-size: 16px;
    cursor:pointer;
    span {
      margin-right: 5px;
      display: inline-block;
      width: 15px;
      height: 15px;
      background-color: rgb(219, 29, 29);
      font-size: 10px;
      text-align: center;
      line-height: 15px;
    }
  }
}
</style>