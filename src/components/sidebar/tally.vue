<template>
  <div>
    <!-- 文章分类标签 -->
    <div class="block" id="tally">
      <h4 style="margin-bottom:15px">文章分类</h4>
      <el-tag v-show="(item.classname)" :key="index" v-for="(item,index) in AllArticleClassName" @click="GotoList(item.classname)">{{item.classname}}</el-tag>
    </div>
  </div>
</template>

<script>
import { getClassify } from '@/network/article'
export default {
  data() {
    return {
      AllArticleClassName: [],
    }
  },
  methods: {
    // 获取所有文章分类
    async GetAllArticleClassName() {
      let { data } = await getClassify();
      this.AllArticleClassName = data;
    },
    // 点击标签去列表
    GotoList(key) {
      this.$router.push({ name: 'Lists', query: { classname: key } })
    }
  },
  created() {
    this.GetAllArticleClassName()
  }
}
</script>

<style lang="scss" scoped>
.el-tag {
  margin: 6px;
  cursor: pointer;
}
</style>