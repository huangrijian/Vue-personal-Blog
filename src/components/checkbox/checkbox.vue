<template>
  <div class='switch-wrap' >
      <input type='checkbox' id= 'switch' @click="handle()">
      <label for='switch'></label>
  </div>
</template>

<script>
  export default {
    methods: {
      data() {
        return {
          readFlag:false,
        }
      },
      handle(){

        let sidebar = this.$parent.$refs.sidebar
        let article = this.$parent.$refs.article
        this.readFlag = !this.readFlag;
        if(this.readFlag){
          sidebar.style.display = 'none'
          article.style.width = '134%'
        }else {
          sidebar.style.display = 'block'
          article.style.width = '100%'
        }      
      }
    },
    created() {
      console.log(this.isname);
     
    },
  }

/**
 *  $refs 获取DOM元素或者组件对象
 *  $parent： 获取当前组件的父组件
    $children：················ 的子组件
    $root：获取new Vue的实例 （即上面的：vm）
    $el: 获取当前组件的DOM元素
 * 
 * */ 
</script>

<style lang="scss" scoped>

</style>
