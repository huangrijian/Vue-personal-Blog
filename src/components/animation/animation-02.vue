<template>
  <div class="wow slideInLeft">
    <!-- 标题 -->
    <h2>transition:translate3d</h2>
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
import WOW from 'wowjs';
  export default {
     data() {
      return {
        content:`null`
      }
    },
    mounted(){
      	let wow = new WOW.WOW({
          boxClass: 'wow',
          animateClass: 'animated',
          offset: 0,
          mobile: true,
          live: true
        });
        wow.init();
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
  width: 160px;
  height: 160px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom:50px ;
  div {
    position: absolute;
    width: 140px;
    height: 140px;
    background-color: red;
    top: 50%;
    left: 50%;
    margin-left: -70px;
    margin-top: -70px;
  }
  div:nth-of-type(1){
    background-color: rgb(30, 255, 0);
    transform: perspective(900px) rotateY(45deg)
  }
  div:nth-of-type(2){
    background-color: orange;
    transform: perspective(900px) rotateY(45deg)
    translate3d(0,0,0);
    transition:1s
  }
}
.container:hover div:nth-of-type(2){
  margin-left: 100px;
  transform: perspective(900px) rotateY(45deg)
  translate3d(0,0,-1150px);
}

</style>