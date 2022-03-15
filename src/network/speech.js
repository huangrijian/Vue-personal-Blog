import { request } from './request'
import { BASE_SPEECH_URL } from './BASE_URL'

// 获取详细发言列表
export function getSpeech() {
  return request({
    url: `${BASE_SPEECH_URL}/getSpeech`
  })
}


// 获取简单发言列表 ---用于后台管理渲染列表
export function getSpeechList() {
  return request({
    url: `${BASE_SPEECH_URL}/getSpeechList`
  })
}