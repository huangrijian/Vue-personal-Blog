<template>
  <div class="box">
    <div class="icon">
      <slot />
    </div>
    <aplayer v-bind="$attrs" v-on="$listeners" />
  </div>

</template>

<script>
import aplayer from "vue-aplayer";
aplayer.disableVersionBadge = true
export default {
  components: {
    aplayer
  }
}
</script>

<style lang="scss" scoped>
.box {
  position: relative;
  .icon {
    position: absolute;
    top: 5px;
    right: 15px;
    z-index: 9999;
    width: 20px;
  }
}
</style>