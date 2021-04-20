<template>
  <div class="commonLayout">
    <!-- 导航条 -->
    <common-header></common-header>
    <!-- 视图切换 -->
      <div class="wrapper marginTop">
      <!-- 版头 -->
      <el-row :gutter="10" class="head">
        <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
          <div class="grid-content bg-purple slideshowBox">
            <router-view></router-view>
          </div>
          </el-col>
        <el-col :lg="6" :xl="6">
          <div class="grid-content bg-purple-light synopsis">
            <div class="sidebar">
              <personal-details ></personal-details>
              <music class="maginbot"></music>
              <tally class="maginbot"></tally>
               <div class="block">
                <!-- 标题 -->
                <title-boxs></title-boxs>
                <!-- 排行列表 -->
                  <ranking-list></ranking-list>         
              </div>
            </div>
          </div>
          </el-col>
      </el-row>
       </div>

    <!-- 侧边栏 -->
    
    <!-- 底部 -->
    <common-bottom></common-bottom>
  </div>
</template>

<script>
import CommonHeader from '@/components/CommonHeader.vue'
import CommonBottom from './CommonBottom.vue'
import PersonalDetails from './sidebar/personalDetails.vue'
import Music from './sidebar/music.vue'
import Tally from './sidebar/tally.vue'
import TitleBoxs from '@/components/TitleBox/titleBoxs.vue'
import RankingList from '@/components/rankingList/rankingList.vue'
export default {
  name: 'commonLayout',
  components:{
    CommonHeader,
    CommonBottom,
    PersonalDetails,
    Music,
    Tally,
    TitleBoxs,
    RankingList
  }
}
</script>

<style scoped lang="scss">
.commonLayout {
  width: 100%;
  height: 100%;
}
.slideshowBox {
  margin-right: 7px;
}
// 侧边栏
.sidebar {
  width: 100%;
  .maginbot {
    margin-bottom: 20px;
    width: 100%;
  }
}
</style>
