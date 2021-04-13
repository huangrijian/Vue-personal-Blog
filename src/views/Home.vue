<template>
  <div class="home">
    <div class="wrapper">
      <!-- 版头 -->
      <el-row :gutter="10" class="head">
        <el-col :xs="8" :sm="6" :md="4" :lg="18" :xl="18">
          <div class="grid-content bg-purple">
            <!-- 轮播图 -->
            <el-carousel trigger="click" height="180px">
              <el-carousel-item v-for="item in 4" :key="item">
                <img class="headImg" src="https://www.zhangqinblog.com//files/learnShare/images/2019-9-3-1.jpg" alt="">
              </el-carousel-item>
            </el-carousel>
          </div>
          </el-col>
        <el-col :xs="4" :sm="6" :md="8" :lg="6" :xl="6">
          <div class="grid-content bg-purple-light synopsis">
            <!-- 个人简介 -->
            <div class="block">
              <h2>黄先森个人简介</h2>
              <div>
                <p>职业：大三学生、前端学习者</p>
                <p>现居：广东省广州市</p>
                <p>Email:923691372@qq.com</p>
              </div>
              <div>
                <!-- 按钮区域 -->
              </div>
            </div>
          </div>
          </el-col>
      </el-row>

     
       <el-row :gutter="10" >
          <!-- 博客列表 -->
        <el-col :xs="8" :sm="6" :md="4" :lg="18" :xl="18" class="BlogList">
          <div class="grid-content bg-purple">
            <div class="block">
              <!-- 小标题组件 -->
              <title-box title="技术博文" class="title-box"></title-box>
              <!-- 文章列表组件 -->
              <blog-list :AllArticle="AllArticle" :AllArticleClassName="AllArticleClassName"></blog-list>
            </div>
          </div>
          </el-col>
          <!-- 右侧 -->
        <el-col :xs="4" :sm="6" :md="8" :lg="6" :xl="6" class="rightBox">
          <div class="grid-content bg-purple-light">
            <!-- 文章分类标签 -->
            <div class="block">
              <h4 style="margin-bottom:15px">文章分类</h4>
              <el-tag v-show="(item.classname)" :key="index" v-for="(item,index) in AllArticleClassName ">{{item.classname}}</el-tag>
            </div>
          </div>
          </el-col>
      </el-row>

      <!-- 博客列表 -->
      <div class="main">
      </div>
    </div>
  </div>
</template>

<script>
// 使用事件总线
import BlogList from '../components/BlogList/BlogList.vue'
import TitleBox from '../components/TitleBox/titleBox.vue'
export default {
  name: 'Home',
  components: {
    BlogList,
    TitleBox
  },
  data() {
    return {
      AllArticle:[],
      AllArticleClassName:[],
    }
  },
  methods:{
    // 获取所有文章
    GetAllArticle(){
     this.$http.get('/api/article/allList').then(res => {
        if(res.data.code === 0){
          this.AllArticle = res.data.data
          console.log(this.AllArticle);

          let titleArry = []
          let titleidArry = []
          this.AllArticle.forEach((item, index) => {
         //item 就是当日按循环到的对象  //index是循环的索引，从0开始
          titleArry.push(item.title)
          titleidArry.push(item.id)
        })
          this.$store.commit('setArticleTitle',titleArry)
          sessionStorage.setItem("titleArry", JSON.stringify(titleArry));
          sessionStorage.setItem("titleidArry", JSON.stringify(titleidArry));
        }
      })
    },
    // 获取所有文章分类
    GetAllArticleClassName(){
      this.$http.get('/api/article/classify').then(res => {
        if(res.data.code === 0){
          console.log(res.data);
          this.AllArticleClassName = res.data.data
          // 获取文章分类后，获取文章数据
          this.GetAllArticle();
        }
      })
    },
  },
  created(){
    this.GetAllArticleClassName();
  }
}
</script>

<style lang="scss" scoped>
.main {
  margin-top: 10px;
  background-color:#f8f8f8;
  padding: 20px;
  border: 1px solid #f0eded;
}
.headImg {
  width: 100%;
}
.head {
  margin-top: 20px;
  // 个人简介
  .synopsis {
    height:180px;

    .block {
      height: 100%;
      background-color: rgb(78, 78, 78);
      h2 {
        padding-bottom: 10px;
        color: rgb(161, 160, 160);
      }
      p {
        margin: 10px 0;
        font-size: 14px;
        color: aliceblue;
      }
    }
  }
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
