<template>
  <div class="commonLayout">
    <!-- 导航条 -->
    <nav>
      <common-header id="nav_header" class="animated  common-header" style="top:0px"></common-header>
    </nav>

    <!-- 切换大屏阅读模式按钮 -->
    <check-box isname="read"></check-box>

    <!-- 中心 -->
    <section>
      <div v-if="isPure">
        <!-- 图片墙专有出口 -->
        <router-view></router-view>
      </div>
      <div class="wrapper marginTop" v-else>
        <el-row :gutter="10" class="head">
          <el-col :lg="5" :xl="5">
            <div class="grid-content bg-purple-light synopsis" style="margin-right: 6px;" ref="sidebar">
              <!-- 左侧边栏 -->
              <aside class="wow slideInRight">
                <!-- 文章时间轴 -->
                <TimerShaft />
                <LickDog style="margin-top:20px">
                  <template v-slot:title>
                    <img style="width:25px" src="../assets/img/dog.png">
                    <span style="margin-left:5px">舔狗日记</span>
                  </template>
                  <template v-slot:pic>
                    <img src="~@/assets/img/1111.png" alt="">
                  </template>
                  <template v-slot:content>
                    {{diary}}
                  </template>
                  <template v-slot:click>
                    <img @click="nextDiary" style="width:25px" src="../assets/img/dog.png">
                  </template>
                </LickDog>
              </aside>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14">
            <div class="grid-content bg-purple slideshowBox">
              <!-- 中间视图切换 -->
              <article ref="article">
                <keep-alive include="timeLocus,Home,LeaveWord">
                  <router-view></router-view>
                </keep-alive>
              </article>
            </div>
          </el-col>
          <el-col :lg="5" :xl="5">
            <div class="grid-content bg-purple-light synopsis" ref="sidebar">
              <!-- 右侧边栏 -->
              <aside class="wow slideInRight">
                <personal-details class="wow slideInRight maginbot"></personal-details>
                <music class="maginbot wow slideInLeft" data-wow-delay="0.2s" />
                <tally class="maginbot"></tally>
                <el-carousel height="302px" v-if="networkhot || nba || topnews || world || it" trigger="click" :interval="5000" arrow="never" indicator-position="outside">
                  <el-carousel-item v-if="networkhot">
                    <HotSearch :newslist="networkhot" type="全网热搜榜">
                      <img width="100%" src="~@/assets/img/hot.png">
                    </HotSearch>
                  </el-carousel-item>
                  <el-carousel-item v-if="nba">
                    <HotSearch :newslist="nba" type="NBA新闻榜">
                      <img width="100%" src="~@/assets/img/lq.png">
                    </HotSearch>
                  </el-carousel-item>
                  <el-carousel-item v-if="topnews">
                    <HotSearch :newslist="topnews" type="今日头条榜">
                      <img width="100%" src="~@/assets/img/tt.png">
                    </HotSearch>
                  </el-carousel-item>
                  <el-carousel-item v-if="world">
                    <HotSearch :newslist="world" type="国际新闻榜">
                      <img width="100%" src="~@/assets/img/gj.png">
                    </HotSearch>
                  </el-carousel-item>
                  <el-carousel-item v-if="it">
                    <HotSearch :newslist="it" type="IT资讯榜">
                      <img width="100%" src="~@/assets/img/it.png">
                    </HotSearch>
                  </el-carousel-item>
                </el-carousel>

                <LickDog style="margin-top:20px">
                  <template v-slot:title>
                    <img style="width:25px" src="../assets/img/jitan.png">
                    <span style="margin-left:5px">心灵毒药</span>
                  </template>
                  <template v-slot:pic>
                    <img src="~@/assets/img/fc.gif" alt="">
                  </template>
                  <template v-slot:content>
                    {{content}}
                  </template>
                  <template v-slot:click>
                    <img @click="nextContent" style="width:25px" src="../assets/img/jitan.png">
                  </template>
                </LickDog>
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
import HotSearch from "@/components/HotSearch/HotSearch.vue";
const DIARY = '你说你想买AJ，今天我去了叔叔的口罩厂做了一天的打包。拿到了两百块钱，加上我这几天省下的钱刚好能给你买一个鞋盒。即没有给我自己剩下一分钱，但你不用担心，因为厂里包吃包住。对了打包的时候，满脑子都是你，想着你哪天突然就接受我的橄榄枝了呢。而且今天我很棒呢，主管表扬我很能干，其实也有你的功劳啦，是你给了我无穷的力量。今天我比昨天多想你一点，比明天少想你一点。'
const CONTENT = '当你觉得自己不行的时候，就走马路上走走，这样你就是一个行人了。'
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
    TimerShaft,
    HotSearch
  },
  data() {
    return {
      content: '',
      diary: '',
      networkhot: [],
      nba: [],
      topnews: [],
      world: [],
      it: [],
      newsKeyWordList: ['networkhot', 'nba', 'topnews', 'world', 'it']
    }
  },
  computed: {
    isPure() {
      return this.$store.state.isPure;
    },
  },
  methods: {

    async getNewListArr(keyWord) {
      const url = `http://api.tianapi.com/${keyWord}/index`;
      const key = 'f5a89e80e1b532e8966c393f22320dea'
      let { data } = await this.$http.get(url, { params: { key }, type: 'specialRequest' })
      if (data.newslist) {
        sessionStorage.setItem(keyWord, JSON.stringify(data.newslist.slice(0, 10)))
      }
      this[keyWord] = JSON.parse(sessionStorage.getItem(keyWord));
      console.log(keyWord, this[keyWord])
    },


    async nextContent() {
      const url = 'http://api.tianapi.com/dujitang/index';
      const key = 'f5a89e80e1b532e8966c393f22320dea'
      try {
        let { data } = await this.$http.get(url, { params: { key }, type: 'specialRequest' })
        this.content = data.newslist ? data.newslist[0].content : CONTENT;
      } catch (error) {
        this.content = CONTENT
      }
    },
    async nextDiary() {
      const url = 'http://api.tianapi.com/txapi/tiangou/index';
      const key = 'f5a89e80e1b532e8966c393f22320dea'
      try {
        let { data } = await this.$http.get(url, { params: { key }, type: 'specialRequest' })
        this.diary = data.newslist ? data.newslist[0].content : DIARY;
      } catch (error) {
        this.context = DIARY
      }
    },
    getNewList() {
      this.newsKeyWordList.forEach(item => {
        this.getNewListArr(item);
      })
    }
  },
  created() {
    this.nextContent();
    this.nextDiary();
    this.getNewList();
  }
}

</script>

<style scoped lang="scss">
.commonLayout {
  // 切换部分
  section {
    margin-top: 20px;
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
