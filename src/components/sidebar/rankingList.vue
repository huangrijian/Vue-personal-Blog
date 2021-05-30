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
      this.$EventBus.$on('startRender',() => {
        this.titArry = this.$store.state.titArry;
        this.titleidArry = this.$store.state.titleidArry;
      })

    }
  }
</script>

<style lang="scss" scoped>

</style>