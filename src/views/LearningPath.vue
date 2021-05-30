<template>
  <div>
    <div id="frozen-btn">
      <button class="green purple" @click="goBack()">返回主页</button>
    </div>
    
    <img src="~@/assets/img/leran-plan.png" alt="">
  </div>
</template>

<script>
  export default {
    methods:{
      goBack() {
        this.$router.push({name:'home'})
      }
    }
  }
</script>

<style lang="scss" scoped>
#frozen-btn {
  display: inline-block;
  width: 10%;
  position: fixed;
  top: 50px;
  left: 50px;
}

div {
  width: 100%;
  img {
    width: 100%;
  }
}
</style>