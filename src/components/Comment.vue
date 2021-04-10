<template>
  <div>
    <div class="comment-box">
      <div v-if="isSignIn === 0" class="signInText">登录留言吧</div>
      <div v-else class="input-box">
        <div class="input-top">
          <div class="img">
            <img class="avatar" src="https://profile.csdnimg.cn/C/8/0/0_gg1234561123" alt="">
            <p class="username">haha</p>
          </div>
          <div class="text">
            <textarea class="comment-contnet" v-model="sub"></textarea>
          </div>
          <div class="input-bottom">
            <el-button type="primary">发表评论</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        sub:'55'
      }
    },
    computed:{
      isSignIn(){
        return this.$store.state.isSignIn;
      }
    }
  }
</script>

<style lang="scss" scoped>
.input-top {
  margin-top: 20px;
  display: flex;
  .img {
    flex: 1;
    .avatar {
      width: 80px;
    }
  }
  .text {
    flex: 8;
    margin: 0 20px;
    .comment-contnet {
      width: 100%;
      height: 100%;
    }
  }
}
</style>