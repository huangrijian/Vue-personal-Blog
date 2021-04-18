<template>
  <div class="home">
    <div class="wrapper">
      <!-- 版头 -->
      <el-row :gutter="10" class="head">
        <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
          <div class="grid-content bg-purple slideshowBox">
            <!-- 轮播图 -->
            <el-carousel trigger="click" height="260px" class="slideshow">
              <el-carousel-item v-for="(item,index) in LbtArticle" :key="index">
                <div class="slideshowBox">
                  <img class="headImg" @click="GotoDetail(item.id)" :src="item.pic_url" alt="">
                  <div class="title threed">{{item.title}}</div>
                </div>
              </el-carousel-item>
            </el-carousel>

            <div class="block">
              <div class="img1" :key="index" v-for="(item,index) in headerArticle">
                <img :src="item.pic_url" @click="GotoDetail(item.id)" alt="">
                <div class="tit">{{item.title}}</div>
              </div>
            </div>
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
                <ul class="buttonBox">
                  <li class="item">
                    <a href="javascript:;" title="个人微信号" class="item-wx"></a>
                    <img class="pic" src="~@/assets/img/wx.jpg" alt="">
                  </li>
                   <li class="item">
                    <a href="javascript:;" target="_blank" title="个人邮箱地址" class="item-e-mail"></a>
                  </li>
                  <li class="item">
                    <a href="https://gitee.com/huang-rijian" title="gitee主页" target="_blank" class="item-git"></a>
                  </li>
                  <li class="item">
                    <a href="javascript:;" title="个人企鹅号" class="item-qq"></a>
                    <img class="pic" src="~@/assets/img/myqq.jpg" alt="">
                  </li>
                </ul>
                <p class="threed">黄先森个人博客站</p>
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
      // 轮播图数据
      LbtArticle:[],
      // 头部文章数据
      headerArticle:[],

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
    GotoDetail(id){
      this.$router.push({path:'detail/'+id})
    },
    // 获取所有文章
    GetAllArticle(){
     this.$http.get('/api/article/allList',{params:{curPage:1,pageSize:9}}).then(res => {
        if(res.data.code === 0){
          // 获取文章数组
          this.AllArticle = res.data.data;
          // 截取一部分给轮播图展示
          this.LbtArticle = res.data.data.slice(0,6)
          // 截取一部分给轮播图右边的盒子
          this.headerArticle = res.data.data.slice(6,8)
          // 标题数组
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
  transform: translateY(-60px);
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
    margin-left: 10px;
    flex: 1;
    padding: 0;
    background-color: rgba(233, 233, 233,0);
  }
}

.buttonBox {
  display: flex;
  margin-top: 20px;
  .item {
    margin: 0 5px;
    cursor:pointer;
    position: relative;
    a {
      display: inline-block;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: aliceblue;
    }
    .item-e-mail {
      background: url('~@/assets/img/e-mail.png') no-repeat;
      background-position: 9px 9px;
      background-size: 65%;
      background-color: #fff;
    }
    .item-wx {
      background: url('~@/assets/img/wxx.png') no-repeat;
      background-position: 5px 5px;
      background-size: 80%;
      background-color: #fff;
    }
    .item-git {
      background: url('~@/assets/img/git.png') no-repeat;
      background-position: 5px 5px;
      background-size: 80%;
      background-color: #fff;
    }
    .item-qq {
      background: url('~@/assets/img/qq.png') no-repeat;
      background-position: 5px 5px;
      background-size: 80%;
      background-color: #fff;
    }
    img {
      width: 60px;
      transition: all 0.5s;
      opacity: 0;
      position: absolute;
      top: -70px;
      left: -5px;
    }
  }
}

// 特效字体
.threed{
color: #fafafa;
letter-spacing: 0;
font-size: 25px!important;
text-align: center;
margin-top: 23px!important;
text-shadow: 
    0px 1px 0px #999, 
    0px 2px 0px #888, 
    0px 3px 0px #777, 
    0px 4px 0px #666, 
    0px 5px 0px #555, 
    0px 6px 0px #444, 
    0px 7px 0px #333, 
    0px 8px 7px #001135 
}

// 鼠标悬浮，显示图片
 .buttonBox .item a:hover {
   box-shadow: 0 0 15px rgb(255, 255, 255);
 }
 .buttonBox .item:hover .pic {
    opacity: 1;
    box-shadow: 0 0 6px rgb(255, 255, 255);
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


.el-carousel__container {
    height: 250px!important;
}

.head {
  margin-top: 20px;
  // 个人简介
  .synopsis {
    height:260px;
    .block {
      height: 100%;
      background-color: rgb(78, 78, 78);
      h2 {
        padding-bottom: 10px;
        color: rgb(214, 211, 211);
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
