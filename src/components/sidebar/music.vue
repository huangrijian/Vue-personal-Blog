<template>
  <div id="music">
    <!-- 搜索框 -->
    <div class="search bar7">
      <div>
        <input type="text" placeholder="请输入歌名" name="crid" @keyup.enter="playMusic(songName)" v-model="songName">
        <button type="submit" id="searchMusic" @click="playMusic(songName)"></button>
      </div>
    </div>
    <!--music：当前播放的音乐。 list：播放列表 ：showlrc：是否显示歌词-->
    <aplayer :music="audio[0]" :list="audio" :show-lrc="true"></aplayer>
  </div>
</template>

<script>
import aplayer from "vue-aplayer";
import { GetSong, GetPlayMisicUrl, GetPlayMisicLyric } from "@/musicNetWork/music.js";
import defaultLrc from '@/assets/defaultLrc.js'
export default {
  name: 'music',
  data() {
    return {
      songName: '许嵩',
      // 音频列表
      audio: [
        // 默认播放列表
        {
          title: '有何不可',
          artist: '许嵩',
          src: require('../../assets/default.mp3'),
          pic: require('../../assets/defaultpic.jpg'),
          lrc: defaultLrc,
        },
      ],
    }
  },
  methods: {
    // 获取歌曲数组元素的歌曲地址和歌词
    async getSrcAndLrcArr(songsArr) {
      let promiseArr = []
      songsArr.forEach((item) => {
        // 每首歌曲都需要获取自己的歌曲地址和歌词
        promiseArr = promiseArr.concat(GetPlayMisicUrl(item.id), GetPlayMisicLyric(item.id))
      })
      // 一起发起获取请求，然后等到全部promise被兑现后拿到结果存储到res
      let res = await Promise.all(promiseArr);
      let resObjArr = [];
      // 将播放链接和歌词存到一个对象，再push到resObjArr
      for (let i = 0; i < res.length; i += 2) {
        let obj = {};
        let [url, lrc] = res.slice(i, i + 2);
        obj.url = url.data[0].url
        obj.lrc = lrc.lrc.lyric
        resObjArr.push(obj);
      }
      return resObjArr
    },
    // 保存歌曲数据格式并返回
    async saveSongData(songsArr, srcAndLrcArr) {
      let songDataArray = [];
      songsArr.forEach((item, index) => {
        // 定义一个对象，用于存放具体数据
        let songData = {}
        // 获取歌名
        songData.title = item.name
        // 获取歌手名
        songData.artist = item.ar[0].name
        // 获取照片
        for (var key in item.al) {
          songData.pic = item.al.picUrl + '?param=100y100'
        }
        // 获取歌曲播放地址
        songData.src = srcAndLrcArr[index].url
        // 获取歌词
        let MisicLyric = srcAndLrcArr[index].lrc
        songData.lrc = MisicLyric || '[00:00.00] (,,•́ . •̀,,) 抱歉，当前歌曲暂无歌词'
        // 最后统一push
        songDataArray.push(songData)
      })
      return songDataArray;
    },

    async playMusic(songName) {
      let { result: { songs } } = await GetSong(songName);
      // 获取歌曲数组的歌曲播放链接和歌词
      let resSrcAndLrcArr = await this.getSrcAndLrcArr(songs);
      // 存储歌曲各种数据,并保存为当前状态
      let songDataArray = await this.saveSongData(songs, resSrcAndLrcArr);
      this.audio = songDataArray;
      // 初始化搜索数据
      this.songName = '';
    },
  },
  components: {
    aplayer
  }
}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
// 音乐组件
.aplayer {
  margin: 0;
  margin-top: 15px;
  border-radius: 5px;
}
#container {
  width: 500px;
  height: 820px;
  margin: 0 auto;
}
div.search {
  padding: 10px 0;
  transform: translateY(20px);
}
div {
  position: relative;
  margin: 0 auto;
}
input,
button {
  border: none;
  outline: none;
}
input {
  width: 100%;
  height: 42px;
  padding-left: 13px;
}
button {
  height: 42px;
  width: 42px;
  cursor: pointer;
  position: absolute;
}
/*搜索框7*/

.bar7 div {
  height: 42px;
}
.bar7 input {
  width: 250px;
  border-radius: 42px;
  border: 2px solid #324b4e;
  background: #f9f0da;
  transition: 0.3s linear;
  float: right;
}
.bar7 input:focus {
  width: 300px;
}
.bar7 button {
  background: none;
  top: -2px;
  right: 20px;
}
.bar7 button:before {
  content: "Search";
  font-family: FontAwesome;
  color: #324b4e;
}
</style>