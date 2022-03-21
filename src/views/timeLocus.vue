<template>
  <div class="block wow slideInLeft">
    <div class="selectCodeBox">
      <code-style-select @OnCodeStyle="getCodeStyle" />
    </div>

    <el-timeline :reverse="true">
      <el-timeline-item :timestamp="item.create_time" placement="top" :key="index" v-for="(item,index) in AllArticle">
        <el-card>
          <span class="title">{{item.title}}</span>
          <mavon-editor v-model="item.content" defaultOpen="preview" :toolbarsFlag="false" :subfield="false" :codeStyle="codeStyle" :boxShadow="false" :ishljs="true" :externalLink="external_link">
          </mavon-editor>
          <p v-if="item.create_time">黄先森 {{item.create_time}}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import CodeStyleSelect from '@/components/CodeStyleSelect/CodeStyleSelect.vue'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { getSpeech } from '@/network/speech';
import { external_link } from '@/assets/js/codeStyle.js';
export default {
  name: 'timeLocus',
  inject: ['reload'],
  data() {
    return {
      AllArticle: [],
      state: this.$store.state.timeLocus,
      codeStyle: this.$store.state.codeStyle,
      external_link: external_link,
    }
  },
  methods: {
    // 获取所有发言
    async getSpeech() {
      let { data } = await getSpeech()
      this.AllArticle = data
    },
    getCodeStyle(newVal) {
      this.codeStyle = newVal
    }
  },
  components: {
    mavonEditor,
    CodeStyleSelect
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
.selectCodeBox {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>