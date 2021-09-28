<template>
  <div class="box">
    <div class="searchItem">
      <span class="sort">{{index}}</span>
      <span class="text">{{title}}</span>
      <span class="like">赞:{{like_count}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props:['id','title','like_count','index'],
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  justify-content: center;
}
.searchItem {
  display: flex;
  cursor:pointer;
  width: 90%;
  align-items: center;
  height: 30px;
  font-size: 12px;
  .text {
    width: 60%;
    word-break:keep-all;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis; 
  }
  .sort {
    display: block;
    padding: 3px;
    margin-right: 10px;
    background: red;
    color:#fff;
  }
  .like {
    margin-left: 5px;
  }
}
</style>
