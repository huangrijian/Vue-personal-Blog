<template>
  <div>
    <div id="top" class="backTop" @click="BackTop()" v-show="flag"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      flag: false
    }
  },
  methods: {
    BackTop() {
      // 页面pc端滚动
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
  },
  mounted() {
    window.addEventListener('scroll', (() => {
      if (document.body.scrollTop >= 100 || window.pageYOffset >= 100 || document.documentElement.scrollTop >= 100) {
        this.flag = true;
      } else {
        this.flag = false
      }
    }), true)
  }
}
</script>
<style lang="scss" scoped>
.backTop {
  position: fixed;
  right: 5px;
  bottom: 110px;
  cursor: pointer;
  width: 50px;
  height: 50px;
  background: url("~@/assets/img/rocket.png");
  background-size: 50px;
  z-index: 10;
}
</style>