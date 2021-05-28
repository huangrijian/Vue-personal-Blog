<template>
  <div>
    <span class="rb_hot_click_title">{{title}}</span>
  </div>
</template>

<script>
  export default {
    props:['title']
  }
</script>

<style lang="scss" scoped>
.rb_hot_click_title {
    display: block;
    margin: 0 auto;
    line-height: 32px;
    color: #000;
    position: relative;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
}
.rb_hot_click_title::before {
    content: "";
    display: block;
    width: 60px;
    height: 2px;
    background: #000;
    position: absolute;
    top: 15px;
    right: 175px;
    transition: all 0.5s ease;
}
.rb_hot_click_title::after {
    content: "";
    display: block;
    width: 60px;
    height: 2px;
    background: #000;
    position: absolute;
    top: 15px;
    left: 175px;
    transition: all 0.5s ease;
}
</style>