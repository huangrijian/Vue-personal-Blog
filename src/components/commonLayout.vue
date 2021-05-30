<template>
  <div class="commonLayout">
    <!-- 导航条 -->
    <nav>
      <common-header class="wow slideInRight common-header" style="top:0px"></common-header>
    </nav>

      <!-- 中心 -->
      <section>
        <div class="wrapper marginTop">
            <el-row :gutter="10" class="head">
              <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
                <div class="grid-content bg-purple slideshowBox">
                      <!-- 视图切换 -->
                        <article>
                          <keep-alive include="timeLocus">
                            <router-view></router-view>
                          </keep-alive>
                        </article>
                </div>
                </el-col>
              <el-col :lg="6" :xl="6">
                <div class="grid-content bg-purple-light synopsis">
                  <!-- 侧边栏 -->
                    <aside class="wow slideInRight">
                      <personal-details class="wow slideInRight"></personal-details>
                      <music class="maginbot wow slideInLeft" data-wow-delay="0.2s"></music>
                      <tally class="maginbot"></tally>
                      <div class="block maginbot">
                        <title-boxs title="最新推荐"></title-boxs>
                        <ranking-list title="点赞排行"></ranking-list>
                      </div>

                      <!-- 最新推荐 -->
                      <!-- <div class="block maginbot wow slideInLeft">
                        <title-boxs title="最新推荐"></title-boxs>
                        <ranking-list title="最新推荐"></ranking-list>       
                      </div>  -->
                      <!-- 点击排行 -->
                      <!-- <div class="block wow slideInRight">
                        <title-boxs title="点赞排行"></title-boxs>
                        <ranking-list title="点赞排行"></ranking-list>       
                      </div> -->
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
import CommonHeader from '@/components/CommonHeader.vue'
import CommonBottom from './CommonBottom.vue'
import PersonalDetails from './sidebar/personalDetails.vue'
import Music from './sidebar/music.vue'
import Tally from './sidebar/tally.vue'
import TitleBoxs from '@/components/TitleBox/titleBoxs.vue'
import RankingList from './sidebar/rankingList.vue'
export default {
  name: 'commonLayout',
  components:{
    CommonHeader,
    CommonBottom,
    PersonalDetails,
    Music,
    Tally,
    TitleBoxs,
    RankingList,
  },
 
}
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
  }
}





</style>
