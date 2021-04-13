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
  background-color: rgb(235, 235, 235);
  // background: url('~@/assets/img/bg.jpg') repeat-y;
  // background-size: 100%;
  // background-position: 0 25%;
}
</style>
