<template>
  <div>

    <el-button class="edit" @click="drawer = true"  type="primary" icon="el-icon-edit" circle/>
    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      size="30%"
    >
      <el-tag class="hrj-tag" v-for="item in arr" :key="item" @click="handleCommand(item)">{{item}}</el-tag>
    </el-drawer>
  </div>
</template>

<script>
export default {
  methods: {
    handleCommand(command) {
      this.$store.commit("setCodeStyle", command);
    },
    handleClose(done) {
      done();
    },
  },

  data() {
    return {
      drawer: false,
      direction: "ttb",
      show: true,
      arr: [
        "agate",
        "androidstudio",
        "arduino-light",
        "arta",
        "ascetic",
        "atom-one-dark",
        "atom-one-light",
        "brown-paper",
        "codepen-embed",
        "color-brewer",
        "dark",
        "default",
        "docco",
        "far",
        "foundation",
        "github",
        "googlecode",
        "grayscale",
        "hybrid",
        "idea",
        "ir-black",
        "magula",
        "mono-blue",
        "monokai-sublime",
        "monokai",
        "obsidian",
        "paraiso-dark",
        "paraiso-light",
        "pojoaque",
        "purebasic",
        "rainbow",
        "routeros",
        "school-book",
        "sunburst",
        "tomorrow-night-blue",
        "tomorrow-night-bright",
        "vs",
        "vs2015",
        "xcode",
        "xt256",
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.hrj-tag {
  margin: 15px;
}
.edit {
  position: absolute;
    top: 3px;
    right: 315px;
}
</style>
