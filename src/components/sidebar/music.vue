<template>
  <div>
    <!-- 搜索框 -->
     <div class="search bar7">
        <div>
            <input type="text" placeholder="请输入歌名" name="crid" @keyup.enter="playMusic(songName)" v-model="songName">
            <button type="submit" @click="playMusic(songName)"></button>
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
          // 默认播放列表
            {
                title:'a song for love',
                artist: '春畑道哉',
                url: 'https://rt01-sycdn.kuwo.cn/7b5137bac33d558e774c26a95ed38bf4/6077019a/resource/n1/18/25/1394031454.mp3',
                pic: "https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2500882770,2076592191&fm=179&app=42&f=PNG?w=150&h=150&s=65527B8B48D619EF5834259A0300C090" ,
                lrc: '[00:00.00] (,,•́ . •̀,,) 抱歉，当前歌曲暂无歌词',
            },
            {
              title:'有何不可',
              artist: '许嵩',
              url:'http://m7.music.126.net/20210420134610/4ae52e699088400fb0b7ef51d689bed5/ymusic/a024/09a7/c4c3/fc0d416790bc729172c636e2d2d1109a.mp3',
              pic: "https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3946104814,302364624&fm=179&app=42&f=JPEG?w=150&h=150&s=061C7F86DCAB3E9C467499230300F043" ,
              lrc: '[00:00.00] (,,•́ . •̀,,) 抱歉，当前歌曲暂无歌词',
            },
            {
              title:'素颜',
              artist: '许嵩 / 何曼婷',
              url:'http://m7.music.126.net/20210420135041/e08eacca6a456bf29c495b2bb31b24eb/ymusic/946c/0b37/2bba/8858bdf600a858c1d7b2c6a225768d94.mp3',
              pic: "https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3287273770,3794212801&fm=179&app=42&f=PNG?w=150&h=150&s=EC1873994F5266CC0C75D0CA030080B1" ,
              lrc: '[00:00.00] (,,•́ . •̀,,) 抱歉，当前歌曲暂无歌词',
            },
            {
              title:'所念皆星河',
              artist: 'CMJ',
              url:'http://m8.music.126.net/20210420135328/0268e8cace47622c76b58056ead6b3cb/ymusic/020c/5652/075e/5fcded78c7a8df3f91e404ddbdaf226b.mp3',
              pic: "https://bkimg.cdn.bcebos.com/pic/42a98226cffc1e178a82357016dae103738da9774315?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2UxNTA=,g_7,xp_5,yp_5/format,f_auto" ,
              lrc: '[00:00.00] (,,•́ . •̀,,) 抱歉，当前歌曲暂无歌词',
            }
        ],
      }
    },
    methods: {
      playMusic(songName){
        this.songName = ''
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