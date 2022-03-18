<template>
  <div class="home">
    <div class="head">
      <!-- 轮播图 -->
      <el-carousel trigger="click" height="260px" class="slideshow  wow slideInLeft">
        <el-carousel-item v-for="(item,index) in LbtArticle" :key="index">
          <div class="slideshowBox" @click="GotoDetail(item.id)">
            <img class="headImg" :src="item.pic_url" alt="">
            <div class="title threed"><span>{{item.title}}</span></div>
          </div>
        </el-carousel-item>
      </el-carousel>
      <!-- 轮播图旁边的盒子 -->
      <div class="block wow slideInLeft">
        <div class="img1" :key="index" v-for="(item,index) in headerArticle">
          <img :src="item.pic_url" @click="GotoDetail(item.id)" alt="">
          <div class="tit">{{item.title}}</div>
        </div>
      </div>
    </div>
    <div class="block main marginTop wow slideInLeft">
      <!-- 小标题组件 -->
      <title-box title="技术博文" class="title-box wow slideInLeft" data-wow-delay="0.4s"></title-box>
      <!-- 文章列表组件 -->
      <blog-list :AllArticle="AllArticle"></blog-list>
    </div>
  </div>
</template>

<script>

import BlogList from '../components/BlogList/BlogList.vue'
import TitleBox from '../components/TitleBox/titleBox.vue'
import { getAllArticle } from '@/network/article.js'

export default {
  name: 'Home',
  components: {
    BlogList,
    TitleBox,
  },
  data() {
    return {
      AllArticle: [],
      // 轮播图数据
      LbtArticle: [],
      // 头部文章数据
      headerArticle: [],

    }
  },
  methods: {
    GotoDetail(id) {
      this.$router.push({ path: 'detail/' + id })
    },
  },
  created() {
    getAllArticle().then(({ data }) => {
      let copyData = data.concat().reverse()
      this.AllArticle = copyData.slice(0, 18)
      this.LbtArticle = copyData.slice(0, 6)
      this.headerArticle = data.slice(6, 8)
    }).catch((err) => {
      console.log(err)
    })

  },
  activated() {
    this.$animation();
  },
  mounted() {
    this.$animation();
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
}
.headImg {
  width: 100%;
  transform: translateY(-60px);
}

.head {
  display: flex;
  .slideshow {
    margin-right: 10px;
  }
  .block {
    background-color: rgba(255, 255, 255, 0);
  }
}

// 轮播图
.slideshowBox :hover .title {
  opacity: 1;
}
.slideshowBox {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  justify-content: center;
  align-content: center;
  cursor: pointer;
  .title {
    font-size: 40px !important;
    padding: 25px;
    color: #fff;
    opacity: 0;
    position: absolute;
    text-align: center;
    top: 60px;
    transition: all 0.5s;
  }
  .slideshow {
    flex: 2;
    border-radius: 5px;
  }
  .block {
    flex: 1;
    padding: 0;
  }
}

// 轮播图旁边的盒子
.block .img1 {
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  img {
    width: 100%;
    border-radius: 5px;
    height: 128px;
    transition: all 0.6s;
    cursor: pointer;
  }
  .tit {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: rgb(228, 225, 225);
    width: 100%;
    text-align: center;
  }
  img:hover {
    transform: scale(1.2);
  }
}

.main {
  padding: 20px !important;
  background-color: white !important;
}

.BlogList {
  margin-top: 15px;
  .title-box {
    margin-top: 15px;
  }
}

.rightBox {
  margin-top: 15px;
  .el-tag {
    margin: 5px;
  }
}
</style>
