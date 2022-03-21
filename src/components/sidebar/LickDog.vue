<template>
  <div class="block maginbot">
    <div class="head">
      <slot name="title"></slot>
    </div>
    <div class="pic">
      <slot name="pic"></slot>
    </div>
    <div class="context">
      <slot name="content"></slot>
    </div>
    <div class="footer">
      <slot name="click"></slot>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped >
.head {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.pic {
  display: flex;
  justify-content: center;
  padding: 15px;
  img {
    width: 70%;
  }
}
.text {
  margin-left: 10px;
  font-size: 18px;
}
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  border: 2px solid #93959b;
  border-radius: 50%;
  margin: 0 auto;
}
.context {
  margin-bottom: 20px;
  border-bottom-left-radius: 15px 225px;
  border-bottom-right-radius: 20px 205px;
  border-top-left-radius: 28px 125px;
  border-top-right-radius: 100px 30px;
  background: #f2f6fc;
  padding: 20px;
  line-height: 1.8;
  border: 1px solid #d7d9df;
  font-size: 14px;
}
</style>