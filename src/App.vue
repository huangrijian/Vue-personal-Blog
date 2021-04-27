<template>
  <div id="app">

      <back-top></back-top>
      <router-view v-if="isRouterShow"></router-view>


      <div id="bgvid" >
          <img src="~@/assets/img/bgbg.jpg" alt="">
      </div>
  </div>
</template>
<script>
import BackTop from './components/backTop/BackTop.vue'
export default {
  components: { BackTop },
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterShow: true
    }
  },
  methods: {
    async reload () {
      this.isRouterShow = false
      await this.$nextTick()
      this.isRouterShow = true
    }
  }
}
</script>
<style lang="scss">
#app {
  width: 100%;
}
#bgvid { 
  position: fixed; 
  right: 0; 
  bottom: 0; 
  width: 100%;
  height: 100%; 
  width: auto; 
  height: auto; 
  z-index: -100; 
  background-size: cover;
  img {
    width: 100%;
    height: 100%;
  }

}
</style>
