<template>

  <div class="block wow slideInRight" style="background-color: rgba(255, 255, 255,.9);">
    <!-- 留言 -->
    <Comment></Comment>
  </div>

</template>

<script>
import Comment from '../components/comment/Comment.vue'
export default {
  name: 'LeaveWord',
  components: { Comment },
  mounted() {
    this.$animation();
  },
  activated() {
    this.$animation();
  }
}
</script>

<style lang="scss" scoped>
</style>