<template>
  <div class="wow slideInRight">
    <!-- 标题 -->
    <h2>transition:translate</h2>
    <!-- 效果 -->
    <div class="container">
      <div>
      </div>
       <div class="box2">
      </div>
    </div>
    <!-- 代码块 -->
    <mavon-editor v-model="content"
          defaultOpen="preview"
          :toolbarsFlag="false"
          :subfield="false"
          codeStyle="atom-one-dark"
          :boxShadow="false"
     >
    </mavon-editor>

  </div>
</template>

<script>
  export default {
     data() {
      return {
        content:`null`
      }
    }
  }
</script>

<style lang="scss" scoped>
h2 {
  font-size: 25px;
  text-align: center;
  margin: 50px;
}
.container {
  width: 150px;
  height: 150px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 50px;
  div {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: red;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  div:nth-of-type(2){
    background-color: orange;
    transition: 1s;
  }
}
.container:hover div:nth-of-type(2){
  margin-left: 100px;
}

</style>