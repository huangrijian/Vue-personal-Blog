<template>
  <div id="mybottom" class="bottom">
    <!-- 计时器 -->
    <timer class="timer threed"></timer>
    <div class="conent">
      <div class="pic">
        <div>
          <img src="~@/assets/img/wx.jpg" alt="">
          <p>微信号</p>
        </div>
         <div>
          <img src="~@/assets/img/wx.jpg" alt="">
          <p>微信号</p>
        </div>
      </div>
      <p>
        <span>
          Copyright © www.zhangqingblog.com All Rights Reserved.
        </span>
      </p>
      <p class="login" @click="login">
        管理员登录
      </p>
      <p>
        <span>
          备案号：鄂ICP备18005731号-2
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import timer from './timer.vue'
  export default {
  components: { timer },
    methods:{
      login(){
        this.$router.push({name:'login'})
      }
    }
  }
</script>

<style lang="scss" scoped>
.bottom {
  margin-top: 30px;
  width: 100%;
  height: 230px;
  background-color: #373D41;
  position: relative;
  .timer {
    position: absolute;
    right: 15px;
    color: white;
    bottom: 15px;
    font-size: 20px!important;
  }
  .conent {
    margin-top: 10px;
    position:absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    color: #73777a;
    font-size: 14px;
    .pic {
      display: flex;
      justify-content: center;
      img {
        width: 100px;
        margin: 0 20px;
      }
    }
     p {
      margin-top: 5px;
      text-align: center;
      span {
          line-height: 30px;
      }
    }
  }
}
</style>