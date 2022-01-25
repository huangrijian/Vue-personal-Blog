<template>
  <div>
    <el-card shadow="hover">
      <el-timeline v-for="(item, index) in timerData" :key="index">
        <!-- <h1>{{ item.year }}</h1> -->
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item :title="item.year+'年'" :name="`${index}`">
            <el-timeline-item
              v-for="(items, indexs) in item.data"
              :key="indexs"
              :timestamp="items.create_time"
              placement="top"
              type="primary"
            >
              <span @click="gotoTodetail(items.id)">{{ items.title }}</span>
            </el-timeline-item>
          </el-collapse-item>
        </el-collapse>
      </el-timeline>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timerData: [],
      activeNames:['0']
    };
  },
  created() {
    this.getTimerData();
  },
  methods: {
    async getTimerData() {
      let {
        data: { data },
      } = await this.$http.get("api/article/timeShaft");
      console.log(data);
      this.timerData = data;
    },
    gotoTodetail(id) {
      this.$router.push({ name: "detail", params: { id } });
      this.$store.commit("setArticleId", id);
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  color: #2e2d2d;
  letter-spacing: 0;
  font-size: 25px !important;
  text-align: center;
  font-weight: 600;
  margin: 20px 0;
}
</style>
