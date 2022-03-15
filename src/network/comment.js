import { request } from './request'
import { BASE_COMMENT_URL } from './BASE_URL'

export function getArticleComment(params) {
  return request({
    method: 'get',
    url: `${BASE_COMMENT_URL}/list`,
    params,
  })
}

export function getArticleCommentCount(params) {
  return request({
    method: 'get',
    url: `${BASE_COMMENT_URL}/listCount`,
    params,
  })
}


export function sendComment(data) {
  return request({
    method: 'post',
    url: `${BASE_COMMENT_URL}/publish`,
    data,
  })
}

export function deleteComment(data) {
  return request({
    method: 'post',
    url: `${BASE_COMMENT_URL}/delete`,
    data,
  })
}