<template>
  <div>
    <div id="frozen-btn">
      <button class="green" :class="ClassArray[index]"  :key="index"  @click="handle(titleidArry[index])"  v-for="(item,index) in titArry"><span>{{index + 1}}.</span>{{item}}</button>
    </div>
  </div>
</template>

<script>
  export default {
    inject: ['reload'],
    props:['title'],
    data() {
      return {
        titArry : '',
        titleidArry : [],
        ClassArray:['green','purple','green','purple','green','purple','green','purple','green','purple']
      }
    },
    methods:{
      handle(id) {
        this.$router.push({name:'detail',params: {id:id}})
        this.reload()
      }
    },
    created(){
      setTimeout(() => {
      // 将sessionStorage上的文章标题列表和id取出 
      //需要等待500毫秒,等着home.vue发起请求,把标题数据设置到sessionStorage
        switch(this.title){
          case "最新推荐" :
            this.titArry = JSON.parse(sessionStorage.getItem('titleArry'));
            this.titleidArry = JSON.parse(sessionStorage.getItem('titleidArry'));
            break
          case "点赞排行" :
            break
        }
      },800)
    }
  }
</script>

<style lang="scss" scoped>

</style>