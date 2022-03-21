<template>
  <div>
    <span class="stroke">当前代码风格：</span>
    <el-select popper-class="option" class="stroke selectCode" size="small" v-model="CodeStyle" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        <span class="stroke">{{ item.label }}</span>
      </el-option>
    </el-select>
  </div>
</template>

<script>
import codeStyle from '@/assets/js/codeStyle.js'
export default {
  data() {
    return {
      AllArticle: [],
      state: this.$store.state.timeLocus,
      options: codeStyle,
      value: this.$store.state.codeStyle
    }
  },
  computed: {
    CodeStyle: {
      get: function () {
        return this.$store.state.codeStyle
      },
      set: function (newValue) {
        this.$emit('OnCodeStyle', newValue)
        this.$store.commit('setCodeStyle', newValue)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.selectCode {
  width: 120px;
  font-size: 14px;
}
</style>