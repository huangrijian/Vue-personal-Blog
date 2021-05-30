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
      <blog-list :AllArticle="AllArticle" :AllArticleClassName="AllArticleClassName"></blog-list>
    </div>
  </div>
</template>

<script>
import WOW from 'wowjs';
import BlogList from '../components/BlogList/BlogList.vue'
import TitleBox from '../components/TitleBox/titleBox.vue'
export default {
  name: 'Home',
  components: {
    BlogList,
    TitleBox,
  },
  data() {
    return {
      AllArticle:[],
      AllArticleClassName:[],
      // 轮播图数据
      LbtArticle:[],
      // 头部文章数据
      headerArticle:[],

    }
  },
  methods:{
    GotoDetail(id){
      this.$router.push({path:'detail/'+id})
    },
  /*
   * 
   * 获取点赞排行的文章并按照降序排序
   * @param {Array} 
   */ 
   ThumbRank(array) {
    //  过滤出点赞数量
    let number = []
    array.forEach(item => {
      number.push(item.like_count)
    })
    // 排序
      number.sort();
      number.sort(function(x,y){
          return x-y;
      })
      number.reverse()

    let nesArrayData = [];
    number = Array.from(new Set(number))
    number.forEach((numberItem) => {
      array.some((arrayItem) => {
      if(arrayItem.like_count === numberItem) {
        nesArrayData.push({id:arrayItem.id,title:arrayItem.title});
        return true
      }
    })
  })

    this.$store.commit('setLikeArry',nesArrayData)
    this.$EventBus.$emit('Render')
  },
  

    // 获取全部文章
    GetAllArticle(){
     this.$http.get('/api/article/typeList').then(res => {
        if(res.data.code === 0){
          this.ThumbRank(res.data.data)
          // 获取前18篇文章
          this.AllArticle = res.data.data.slice(0,18)
          // 截取最新的6篇给轮播图展示  .concat() 先将文章数组复制出一个新数组再进行反转，如果使用.reverse(),则会改变文章数组，而不产生新数组
          this.LbtArticle = res.data.data.concat().reverse().slice(0,6)
            // 截取一部分给轮播图右边的盒子
          this.headerArticle = res.data.data.slice(6,8)
          // 保存最新推荐的文章数据
          this.SaveLatestRecommen();
        }
      })
    },
    // 获取所有文章分类
    GetAllArticleClassName(){
      this.$http.get('/api/article/classify').then(res => {
        if(res.data.code === 0){
          this.AllArticleClassName = res.data.data;
          // 获取全部文章
           this.GetAllArticle();
        }
      })
    },
    // 保存最新推荐的文章数据
    SaveLatestRecommen() {
         // 标题数组
          let RecommendArry = []
          // 获取最新推荐的文章id和标题
          this.LbtArticle.forEach((item, index) => {
         //item 就是当前按循环到的对象  //index是循环的索引，从0开始
          RecommendArry.push({id:item.id,title:item.title})
        })
          // 保存最新推荐到Vuex
          this.$store.commit('setRecommendArry',RecommendArry)
          this.$EventBus.$emit('Render')
    }

  },
  created(){
    this.GetAllArticleClassName();
   
  },
  mounted(){
      	let wow = new WOW.WOW({
          boxClass: 'wow',
          animateClass: 'animated',
          offset: 0,
          mobile: true,
          live: true
        });
        wow.init();
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
    background-color: rgba(255, 255, 255,0);
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
  cursor:pointer;
  .title {
    font-size: 40px!important;
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
    cursor:pointer;
  }
  .tit {
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: rgb(228, 225, 225);
    width: 100%;
    text-align: center;
  }
  img:hover {
    transform: scale(1.2);
  }

}

.main {
  padding: 20px!important;
  background-color: white!important;
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
