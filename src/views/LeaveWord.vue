<template>
     <div class="wrapper">
    <el-row :gutter="10" class="head marginTop">
          <el-col :xs="23" :sm="23" :md="23" :lg="18" :xl="18">
            <div class="grid-content bg-purple">
              <!-- 文章 -->
              <div class="block">
                <!-- 留言 -->
                <comment></comment>
              </div>
            </div>
            </el-col>
          <el-col :xs="1" :sm="1" :md="1" :lg="6" :xl="6">
            <div class="grid-content bg-purple-light synopsis">
                55
            </div>
            </el-col>
    </el-row>
   </div>
</template>

<script>
import Comment from '../components/Comment.vue'
export default {
  components: { Comment },
  
}
</script>

<style lang="scss" scoped>

</style>