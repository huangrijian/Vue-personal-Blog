<template>
  <div>
    <!-- 搜索框 -->
     <div class="search bar7">
        <div>
            <input type="text" placeholder="请输入歌名" name="crid" @keyup.enter="playMusic(songName)" v-model="songName">
            <button type="submit"></button>
        </div>
    </div>

     <!--music：当前播放的音乐。 list：播放列表 ：showlrc：是否显示歌词-->
     <aplayer :music="audio[0]" :list="audio"  :showlrc="true"></aplayer>
  </div>
</template>

<script>
import aplayer from "vue-aplayer"; 
import {GetSong,GetPlayMisicUrl,GetPlayMisicLyric} from "@/musicNetWork/music.js"; 
  export default {
    data() {
      return {
        songName:'',
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
                url: '../../assets/music/m1.mp3',
                pic: "https://y.gtimg.cn/music/photo_new/T002R300x300M000002pgY7c3LgAqu_1.jpg?max_age=2592000" ,
                lrc: '[00:00.00] (,,•́ . •̀,,) 暂无歌词',
            },
            // {
            //     title:'晴天',
            //     artist: '周杰伦',
            //     url: 'http://sy.sycdn.kuwo.cn/0e376a770dcae9116d4d64d236090aa8/6076ff95/resource/n2/99/30/814703912.mp3',
            //     pic: 'https://img2.kuwo.cn/star/albumcover/500/64/96/2266534336.jpg', // prettier-ignore
            //     lrc: '[00:00.00] (,,•́ . •̀,,) 抱歉，当前歌曲暂无歌词',
            // },
            // {
            //     title:'a song for love',
            //     artist: '春畑道哉',
            //     url: 'https://rt01-sycdn.kuwo.cn/7b5137bac33d558e774c26a95ed38bf4/6077019a/resource/n1/18/25/1394031454.mp3',
            //     pic: "https://img4.kuwo.cn/star/albumcover/500/79/90/3173998088.jpg" ,
            //     lrc: '[00:00.00] (,,•́ . •̀,,) 抱歉，当前歌曲暂无歌词',
            // },
            // {
            //   title:'素颜',
            //   artist: '许嵩 / 何曼婷',
            //   url:'http://m8.music.126.net/20210414232103/d274a7df3cd275d3153aa8daa6caa35b/ymusic/946c/0b37/2bba/8858bdf600a858c1d7b2c6a225768d94.mp3',
            //   pic: "http://p1.music.126.net/LMyITvYRS7NsgA9lYUKpqg==/109951164179134667.jpg?param=130y130" ,
            //   lrc: '[00:00.00] (,,•́ . •̀,,) 抱歉，当前歌曲暂无歌词',
            // }
        ],
      }
    },
    methods: {
      
      // 
      playMusic(songName){
        // 定义一个存放歌词数据对象的数组
        let songDataArray = []
        GetSong(songName).then(res => {
          console.log(res.result.songs);
          // 循环请求得到的歌曲数据
          res.result.songs.forEach( async (item,index,array) => {
            // 定义一个对象，用于存放具体数据
            let songData = {}
            // 获取歌名
            songData.title = item.name
            // 获取歌手名
            songData.artist = item.ar[0].name
            // 获取照片
            for(var key in  item.al){
              songData.pic = item.al.picUrl
            }
            // 获取歌曲播放地址
            let musicUrl = await GetPlayMisicUrl(item.id)
            songData.url = musicUrl.data[0].url            
            // 获取歌词
            let MisicLyric = await GetPlayMisicLyric(item.id)
            if(MisicLyric.nolyric){
              songData.lrc = '[00:00.00] (,,•́ . •̀,,) 抱歉，当前歌曲暂无歌词'
            }else {
              songData.lrc = MisicLyric.lrc.lyric
            }
            //  完成此条数据的循环，将得到的歌曲数据push到数组
             songDataArray.push(songData)
    　　　  }
　　       );
        })
        // 将此次搜索得到的数据全部赋值给audio,等待播放
        this.audio = songDataArray
      }
    },
    components:{
      aplayer
    }
  }
</script>

<style lang="scss" scoped>
* {
	box-sizing:border-box;
}
// 音乐组件
.aplayer {
  margin: 0;
  margin-top: 15px;
  border-radius: 5px;
}
#container {
	width:500px;
	height:820px;
	margin:0 auto;
}
div.search {
	padding:10px 0;
  transform: translateY(20px);
}
div {
	position:relative;
	margin:0 auto;
}
input,button {
	border:none;
	outline:none;
}
input {
	width:100%;
	height:42px;
	padding-left:13px;
}
button {
	height:42px;
	width:42px;
	cursor:pointer;
	position:absolute;
}
/*搜索框7*/
      
.bar7 div {
	height:42px;
}
.bar7 input {
	width:250px;
	border-radius:42px;
	border:2px solid #324B4E;
	background:#F9F0DA;
	transition:.3s linear;
	float:right;
}
.bar7 input:focus {
	width:300px;
}
.bar7 button {
	background:none;
	top:-2px;
	right:20px;
}
.bar7 button:before {
	content:"Search";
	font-family:FontAwesome;
	color:#324b4e;
}
</style>