import {request} from './request'


// 获取最新音乐
export function GetSong(keywords){
  return request({
    url:'/cloudsearch',
    params:{
      keywords,
      limit:10
    }
  })
}

// 获取音乐播放地址
export function GetPlayMisicUrl(id){
  return request({
    url:'/song/url',
    params: {
      id
    }
  })
}

// 获取歌词 
export function GetPlayMisicLyric(id){
  return request({
    url:'/lyric',
    params: {
      id
    }
  })
}

