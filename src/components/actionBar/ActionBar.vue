<template>
  <div class="container">
    <el-tooltip class="item" effect="dark" content="切换背景" placement="left">
      <el-button icon="el-icon-edit" circle @click="drawer = true" />
    </el-tooltip>

    <el-drawer :visible.sync="drawer" :direction="direction" :before-close="handleClose" size="50%" :with-header="false" :show-close="false" ref="drawer">
      <el-tabs v-model="activeName">
        <el-tab-pane label="风景" name="first">
          <div class="box">
            <div class="block" @click="handleClick(item)" v-for="(item, index) in src" :key="index">
              <el-image :src="item"></el-image>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="动漫" name="second">
          <div class="box">
            <div class="block" @click="handleClick(item)" v-for="(item, index) in src2" :key="index">
              <el-image :src="item"></el-image>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      drawer: false,
      direction: "ttb",
      activeName: "second",
      src: [
        require("../../assets/img/bgbg.jpg"),
        require("../../assets/img/bj02.jpg"),
        require("../../assets/img/bg03.jpg"),
        require("../../assets/img/bg04.jpg"),
        require("../../assets/img/bg05.jpg"),
        require("../../assets/img/bg06.jpg"),
        require("../../assets/img/bg07.jpg"),
        require("../../assets/img/bg08.jpg"),
        require("../../assets/img/bg09.jpg"),
        require("../../assets/img/bg10.jpg"),
        require("../../assets/img/bg11.jpg"),
        require("../../assets/img/bg12.jpg"),
      ],
      src2: [
        require("../../assets/img/bgdm01.jpg"),
        require("../../assets/img/bgdm02.jpg"),
        require("../../assets/img/bgdm03.jpg"),
        require("../../assets/img/bgdm04.jpg"),
        require("../../assets/img/bgdm05.jpg"),
        require("../../assets/img/bgdm06.jpg"),
        require("../../assets/img/bgdm07.jpg"),
        require("../../assets/img/bgdm08.jpg"),
        require("../../assets/img/bgdm09.jpg"),
        require("../../assets/img/bgdm10.jpg"),
        require("../../assets/img/bgdm11.jpg"),
        require("../../assets/img/bgdm12.jpg"),
      ],
    };
  },
  methods: {
    handleClick(src) {
      this.$store.commit("setBgimgUrl", src);
      this.$refs.drawer.closeDrawer();
    },
    handleClose(done) {
      done();
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  position: fixed;
  right: 10px;
  bottom: 15px;
  z-index: 9999;
}
.block {
  width: 320px;
  height: 178px;
  overflow: hidden;
  padding: 10px;
}
.box {
  display: flex;
  flex-wrap: wrap;
}
</style>
