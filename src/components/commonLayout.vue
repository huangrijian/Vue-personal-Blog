<template>
  <div class="commonLayout">
    <common-header></common-header>
    <router-view></router-view>
    <common-bottom></common-bottom>
  </div>
</template>

<script>
import CommonHeader from '@/components/CommonHeader.vue'
import CommonBottom from './CommonBottom.vue'
export default {
  name: 'commonLayout',
  components:{
    CommonHeader,
    CommonBottom
  }
}
</script>

<style scoped lang="scss">
.commonLayout {
  width: 100%;
  height: 100%;
}
</style>
