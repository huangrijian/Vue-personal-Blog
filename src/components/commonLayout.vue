<template>
  <div class="commonLayout">
    <!-- 导航条 -->
    <nav>
      <common-header @goTo="goTo()" class="wow slideInRight common-header" style="top:0px"></common-header>
    </nav>

    <!-- 切换大屏阅读模式按钮 -->
    <check-box isname="read"></check-box>

      <!-- 中心 -->
      <section>
        <div class="wrapper marginTop">
            <el-row :gutter="10" class="head" v-show="!isShowDiv">
              <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
                <div class="grid-content bg-purple slideshowBox">
                  <!-- 视图切换 -->
                    <article ref="article">
                      <keep-alive include="timeLocus">
                        <router-view></router-view>
                      </keep-alive>
                    </article>
                </div>
                </el-col>
              <el-col :lg="6" :xl="6">
                <div class="grid-content bg-purple-light synopsis" ref="sidebar">
                  <!-- 侧边栏 -->
                    <aside class="wow slideInRight">
                      <personal-details class="wow slideInRight maginbot"></personal-details>
                       <div class="block celebrity">
                         <div class="block maginbot item">
                           “时间就像海绵里的水,只要愿挤,总还是有的”
                         </div>
                         <div class="block item">
                           “人类的悲欢并不相通，我只觉得他们吵闹。”
                         </div>
                         
                       </div>
                      <music class="maginbot wow slideInLeft" data-wow-delay="0.2s"></music>
                      <tally class="maginbot"></tally>

                      <div class="block maginbot showTransition" @click="showTransition">css动画效果展示</div>
                      <div class="block maginbot">
                        <title-boxs title="最新推荐"></title-boxs>
                        <ranking-list title="最新推荐"></ranking-list>
                      </div>
                      <div class="block maginbot">
                        <title-boxs title="点赞排行"></title-boxs>
                        <ranking-list title="点赞排行"></ranking-list>
                      </div>
                    </aside>
                </div>
                </el-col>
            </el-row>
            <!-- 动画效果展示  -->
            <animation  v-if="isShowDiv"></animation>
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
import CheckBox from '@/components/checkbox/checkbox.vue'
import Animation from '../views/animation.vue'
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
    CheckBox,
    Animation
  },
  data() {
    return {
      isShowDiv:false
    }
  },
  methods: {
    goTo(){
      this.isShowDiv = false
    },
    showTransition(){
      this.isShowDiv = true;
      window.pageYOffset = document.documentElement.scrollTop = 0;
    }
  }
 
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
    .celebrity {
      
      height: 255px;
      background: url("~@/assets/img/lx.jpg");
      background-position: center;
      background-size: 100%;
      z-index: 3;
      .item {
        position: relative;
        background:hsla(0, 0%, 100%, .5);
        box-shadow: 0 0 15px rgb(44, 44, 44);
        z-index: 99;
        // background:hsla(hue, saturation, lightness, alpha);
      }
      .item::before {
        position: absolute;
        content: '';
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

.showTransition {
  cursor:pointer;
  text-align: center;
  font-weight: 600;
}



</style>
