<template>
  <div class="container">
    <div class="title">{{title}}</div>
    <div class="bottom"></div>
  </div>
</template>

<script>
  export default {
    props:['title']
  }
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 10px;
  font-size: 16px;
}
.bottom {
  width: 5%;
  border-bottom: 2px solid #999;
}
</style>