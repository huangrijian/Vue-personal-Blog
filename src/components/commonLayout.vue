<template>
  <div class="commonLayout">
    <common-header></common-header>
    <router-view></router-view>
  </div>
</template>

<script>
import CommonHeader from '@/components/CommonHeader.vue'
export default {
  name: 'commonLayout',
  components:{
    CommonHeader
  }
}
</script>

<style scoped lang="scss">
.commonLayout {
  width: 100%;
  height: 100%;
}
</style>
