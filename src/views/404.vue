<template>
  <div id="404">
    <main>
      <section>404!找不到页面</section>
      <section>UH OH! 页面丢失</section>
      <p>您所寻找的页面不存在。你可以点击下面的按钮，返回主页。</p>
       <div id="frozen-btn">
        <button class="green" @click="goBack">返回</button>
       </div>
    </main>
    
  </div>
</template>

<script>
  export default {
    methods:{
      goBack() {
        this.$router.replace({path:'/'})
      }
    }
  }
</script>

<style lang="scss" scoped>
main {
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  section {
    font-size: 50px;
    margin: 10px;
  }
  #frozen-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>