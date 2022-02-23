import {request} from './request'

export function getAllArticle(){
  return request({
    url:'/api/article/typeList'
  })
}