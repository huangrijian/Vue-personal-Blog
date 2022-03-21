<template>
  <div>
    <h2>{{data.title}}</h2>
    <div class="timeBox">
      <span v-if="data.create_time" class="timer"><i class="iconfont icon-date"></i>{{data.create_time | timer()}}</span>
      <span><i class="el-icon-view"></i>{{data.visited}}</span>
      <span>&nbsp;&nbsp;&nbsp;{{data.author}}</span>
    </div>
    <!-- 具体文章内容 -->
    <div class="detail">
      <mavon-editor v-model="data.content" defaultOpen="preview" :subfield="false" :boxShadow="false" :ishljs="true" :codeStyle="codeStyle" :externalLink="external_link" :toolbars="toolbars">
      </mavon-editor>
    </div>
  </div>
</template>

<script>

import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { external_link } from '@/assets/js/codeStyle.js';
export default {
  props: ['data', 'codeStyle'],
  components: {
    mavonEditor
  },
  data() {
    return {
      external_link: external_link,
      toolbars: {
        readmodel: true, // 沉浸式阅读
        navigation: true, // 导航目录
        subfield: true, // 单双栏模式
        preview: true, // 预览
      }
    }
  },
  filters: {
    timer(str) {
      return str.substring(0, 9);
    },
  }
}
</script>

<style lang="scss" scoped>
/deep/ ol,
ul,
li {
  list-style-type: disc;
}
.timer {
  margin-right: 15px;
}
.timeBox {
  margin-bottom: 20px;
}
i {
  margin-right: 5px;
}
h2 {
  font-size: 25px;
  font-weight: 550;
  margin: 20px 0;
}
</style>