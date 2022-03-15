<template>
  <div class="block wow slideInLeft">
    <el-timeline :reverse="true">
      <el-timeline-item :timestamp="item.create_time" placement="top" :key="index" v-for="(item,index) in AllArticle">
        <el-card>
          <span class="title">{{item.title}}</span>
          <mavon-editor v-model="item.content" defaultOpen="preview" :toolbarsFlag="false" :subfield="false" codeStyle="monokai" :boxShadow="false" :ishljs="true" :externalLink="external_link">
          </mavon-editor>
          <p v-if="item.create_time">黄先森 {{item.create_time}}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { getSpeech } from '@/network/speech'
export default {
  name: 'timeLocus',
  inject: ['reload'],
  data() {
    return {
      AllArticle: [],
      state: this.$store.state.timeLocus,
      external_link: {
        markdown_css: function () {
          return 'https://cdn.bootcdn.net/ajax/libs/github-markdown-css/5.1.0/github-markdown.min.css';
        },
        hljs_js: function () {
          return 'https://cdn.bootcdn.net/ajax/libs/highlight.js/11.3.1/highlight.min.js';
        },
        hljs_lang: function (lang) {
          return (
            'https://cdn.bootcdn.net/ajax/libs/highlight.js/11.3.1/languages/' +
            lang +
            '.min.js'
          );
        },
        hljs_css: function (css) {
          if (css) {
            return (
              'https://cdn.bootcdn.net/ajax/libs/highlight.js/11.3.1/styles/' +
              css +
              '.min.css'
            );
          }
          return '';
        },
        katex_js: function () {
          return 'https://cdn.bootcdn.net/ajax/libs/KaTeX/0.8.3/katex.min.js';
        },
        katex_css: function () {
          return 'https://cdn.bootcdn.net/ajax/libs/KaTeX/0.8.3/katex.min.css';
        }
      }
    }
  },
  methods: {
    // 获取所有发言
    async getSpeech() {
      let { data } = await getSpeech()
      this.AllArticle = data
    }
  },
  created() {
    this.getSpeech();
  },
  activated() {
    this.$animation();
    if (this.$store.state.timeLocus == 1) {
      // 为1说明当前文章数据被刷新了，需要重新刷新当前组件
      this.reload();
      this.$store.commit('changeTimeLocus', 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 16px;
  font-weight: 600;
}
.content {
  margin: 20px 0;
}
</style>