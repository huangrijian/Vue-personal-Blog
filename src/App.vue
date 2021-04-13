<template>
  <div id="app">
      <router-view v-if="isRouterShow"></router-view>
  </div>
</template>
<script>
export default {
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

</style>
