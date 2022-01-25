<template>
  <div class="commonLayout">
    <!-- 导航条 -->
    <nav>
      <common-header
        class="wow slideInRight common-header"
        style="top:0px"
      ></common-header>
    </nav>

    <!-- 切换大屏阅读模式按钮 -->
    <check-box isname="read"></check-box>

    <!-- 中心 -->
    <section>
       <div v-if="isPure">
        {{ isPure }}
        <router-view></router-view>
      </div>
      <div class="wrapper marginTop" v-else>
        <el-row :gutter="10" class="head">
           <el-col :lg="5" :xl="5">
            <div class="grid-content bg-purple-light synopsis" ref="sidebar">
              <!-- 侧边栏 -->
              <aside class="wow slideInRight">
                <!-- 文章时间轴 -->
                <TimerShaft/>
              </aside>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14">
            <div class="grid-content bg-purple slideshowBox">
              <!-- 视图切换 -->
              <article ref="article">
                <keep-alive include="timeLocus">
                  <router-view></router-view>
                </keep-alive>
              </article>
            </div>
          </el-col>
          <el-col :lg="5" :xl="5">
            <div class="grid-content bg-purple-light synopsis" ref="sidebar">
              <!-- 侧边栏 -->
              <aside class="wow slideInRight">
                <personal-details
                  class="wow slideInRight maginbot"
                ></personal-details>
                <music class="maginbot wow slideInLeft" data-wow-delay="0.2s" />
                <tally class="maginbot"></tally>
                <LickDog />
              </aside>
            </div>
          </el-col>
        </el-row>
      </div>
     
    </section>

    <!-- 底部 -->
    <footer>
      <common-bottom></common-bottom>
    </footer>
  </div>
</template>

<script>
import CommonHeader from "@/components/CommonHeader.vue";
import CommonBottom from "./CommonBottom.vue";
import PersonalDetails from "./sidebar/personalDetails.vue";
import Music from "./sidebar/music.vue";
import Tally from "./sidebar/tally.vue";
import TitleBoxs from "@/components/TitleBox/titleBoxs.vue";
import RankingList from "./sidebar/rankingList.vue";
import CheckBox from "@/components/checkbox/checkbox.vue";
import TimerShaft from "@/components/timerShaft/TimerShaft.vue";
import LickDog from "./sidebar/LickDog.vue";

export default {
  name: "commonLayout",
  components: {
    CommonHeader,
    CommonBottom,
    PersonalDetails,
    Music,
    Tally,
    TitleBoxs,
    RankingList,
    CheckBox,
    LickDog,
    TimerShaft
  },
  created() {
    console.log(this.$router);
  },
  beforeUpdate() {
    console.log(this.$router);
  },
  computed: {
    isPure() {
      return this.$store.state.isPure;
    },
  },
};
</script>

<style scoped lang="scss">
.commonLayout {
  // width: 100%;
  // height: 100%;
  // 导航条
  .common-header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 9999;
  }
  // 切换部分
  section {
    margin-top: 80px;
    .slideshowBox {
      margin-right: 7px;
    }
  }
  // 侧边栏
  aside {
    width: 100%;
    .maginbot {
      margin-bottom: 20px;
      width: 100%;
    }
    .celebrity {
      height: 255px;
      background: url("~@/assets/img/lx.jpg");
      background-position: center;
      background-size: 100%;
      z-index: 3;
      .item {
        position: relative;
        background: hsla(0, 0%, 100%, 0.5);
        box-shadow: 0 0 15px rgb(44, 44, 44);
        z-index: 99;
        // background:hsla(hue, saturation, lightness, alpha);
      }
      .item::before {
        position: absolute;
        content: "";
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 4;
        filter: blur(20px);
      }
    }
  }
}
</style>
