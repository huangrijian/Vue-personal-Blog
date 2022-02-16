<template>

  <div class="block wow slideInRight" style="background-color: rgba(255, 255, 255,.9);"> 
    <!-- 留言 -->
    <Comment></Comment>
  </div>

</template>

<script>
import WOW from 'wowjs';
import Comment from '../components/comment/Comment.vue'
export default {
  components: { Comment },
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

</style>