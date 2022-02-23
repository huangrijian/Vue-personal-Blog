import {request} from './request'

export function getArticleDetail(params){
  return request({
    url:'/api/article/detail',
    params,
  })
}