<template>
  <div class="home">
    <div class="wrapper">
      <!-- 版头 -->
      <el-row :gutter="10" class="head">
        <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
          <div class="grid-content bg-purple">
            <!-- 轮播图 -->
            <el-carousel trigger="click" height="180px">
              <el-carousel-item v-for="item in 4" :key="item">
                <img class="headImg" src="https://www.zhangqinblog.com//files/learnShare/images/2019-9-3-1.jpg" alt="">
              </el-carousel-item>
            </el-carousel>
          </div>
          </el-col>
        <el-col :lg="6" :xl="6">
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
        <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18" class="BlogList">
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
        <el-col :lg="6" :xl="6" class="rightBox">
          <div class="grid-content bg-purple-light">
            <!-- 文章分类标签 -->
            <div class="block">
              <h4 style="margin-bottom:15px">文章分类</h4>
              <el-tag v-show="(item.classname)" :key="index" v-for="(item,index) in AllArticleClassName" @click="GotoList(item.classname)">{{item.classname}}</el-tag>
            </div>

            <!--music：当前播放的音乐。 list：播放列表 ：showlrc：是否显示歌词-->
            <aplayer :music="audio[0]" :list="audio"  :showlrc="true"></aplayer>
          </div>
          </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import aplayer from "vue-aplayer";  
// 使用事件总线
import BlogList from '../components/BlogList/BlogList.vue'
import TitleBox from '../components/TitleBox/titleBox.vue'
export default {
  name: 'Home',
  components: {
    BlogList,
    TitleBox,
    aplayer 
  },
  data() {
    return {
      AllArticle:[],
      AllArticleClassName:[],
        // 音频列表
        audio:  [
            {
                title:'永不失联的爱 (Live)',
                artist: '单依纯',
                url: 'http://ws.stream.qqmusic.qq.com/C400003pHTmt1BBWWu.m4a?guid=9472311977&vkey=85AFEF73A06870A73160510ED9E44D38DD924B0F04DB692D4BF92F57A92ACE6D72406FCA50E32DD542178E97818B422AF30981081DF0C18A&uin=923691372&fromtag=66',
                pic: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000003pPGDz4cbwj1_1.jpg?max_age=2592000',
                lrc: '[00:00.00] (,,•́ . •̀,,) 暂无歌词',
            },

            
            {
                title:'不该 (Live)',
                artist: '刘惜君 / R1SE赵磊',
                url: 'http://ws.stream.qqmusic.qq.com/C4000029XAuH3n1fNO.m4a?guid=9472311977&vkey=A9BDA6F2351F0723F92732BA46263CA7B469F53A4DE661EE9AC505E92FC61B4C947A98EB6271796C26C8A369D32CF1660EE5730FB9F561F6&uin=&fromtag=66',
                pic: "https://y.gtimg.cn/music/photo_new/T002R300x300M000002pgY7c3LgAqu_1.jpg?max_age=2592000" ,
                lrc: '[00:00.00] (,,•́ . •̀,,) 暂无歌词',
            },
            {
                title:'晴天',
                artist: '周杰伦',
                url: 'http://sy.sycdn.kuwo.cn/0e376a770dcae9116d4d64d236090aa8/6076ff95/resource/n2/99/30/814703912.mp3',
                pic: 'https://img2.kuwo.cn/star/albumcover/500/64/96/2266534336.jpg', // prettier-ignore
                lrc: '[00:00.00] (,,•́ . •̀,,) 抱歉，当前歌曲暂无歌词',
            },
            {
                title:'a song for love',
                artist: '春畑道哉',
                url: 'https://rt01-sycdn.kuwo.cn/7b5137bac33d558e774c26a95ed38bf4/6077019a/resource/n1/18/25/1394031454.mp3',
                pic: "https://img4.kuwo.cn/star/albumcover/500/79/90/3173998088.jpg" ,
                lrc: '[00:00.00] (,,•́ . •̀,,) 抱歉，当前歌曲暂无歌词',
            },
            {
              title:'素颜',
              artist: '许嵩 / 何曼婷',
              url:'http://m8.music.126.net/20210414232103/d274a7df3cd275d3153aa8daa6caa35b/ymusic/946c/0b37/2bba/8858bdf600a858c1d7b2c6a225768d94.mp3',
              pic: "http://p1.music.126.net/LMyITvYRS7NsgA9lYUKpqg==/109951164179134667.jpg?param=130y130" ,
              lrc: '[00:00.00] (,,•́ . •̀,,) 抱歉，当前歌曲暂无歌词',
            }
        ],

    }
  },
  methods:{
    // 获取所有文章
    GetAllArticle(){
     this.$http.get('/api/article/allList',{params:{curPage:1,pageSize:9}}).then(res => {
        if(res.data.code === 0){
          // 获取文章数组
          this.AllArticle = res.data.data
          let titleArry = []
          let titleidArry = []
          // 获取文章id和标题
          this.AllArticle.forEach((item, index) => {
         //item 就是当日按循环到的对象  //index是循环的索引，从0开始
          titleArry.push(item.title)
          titleidArry.push(item.id)
        })
          // 保存到vuex和本地
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
    // 点击标签去列表
    GotoList(key){
      this.$router.push({name:'Lists',query: {key}})
    }
  },
  created(){
    this.GetAllArticleClassName();
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
}
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

// 音乐组件
.aplayer {
  margin: 0;
  margin-top: 15px;
  border-radius: 5px;
}

</style>
