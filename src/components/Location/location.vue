<template>
  <div>
     <div class="location">
      <span class="locationTop">您现在的位置是：</span>
      <span>{{Tit1}}</span>
      <span class="symbol">></span>
      <span>{{Tit2}}</span>
      <span v-if="Tit3">></span>
      <span>{{Tit3}}</span>
     </div>
  </div>
</template>

<script>
  export default {
    props:['Tit1','Tit2','Tit3']
  }
</script>

<style lang="scss" scoped>
.location {
  padding-bottom: 10px;
  border-bottom: 2px solid rgb(41, 40, 40);
}
.locationTop {
  font-weight: 600;
}
.symbol {
  margin: 0 5px;
}
</style>