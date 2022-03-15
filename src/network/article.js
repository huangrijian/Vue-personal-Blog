import { request } from './request'
import { BASE_ARTICLE_URL } from './BASE_URL'


export function getArticleDetail(params) {
  return request({
    url: `${BASE_ARTICLE_URL}/detail`,
    params,
  })
}

// 获取搜索的关键字文章，默认第一页是3篇
export function searchArticle(keyWord, limit = 3, offset = 0) {
  return request({
    method: 'post',
    url: `${BASE_ARTICLE_URL}/search`,
    data: {
      keyWord,
      limit,
      offset
    }
  })
}

export function searchCount(keyWord) {
  return request({
    method: 'post',
    url: `${BASE_ARTICLE_URL}/searchCount`,
    data: {
      keyWord
    }
  })
}

// 获取全部文章
export function getAllArticle() {
  return request({
    method: 'get',
    url: `${BASE_ARTICLE_URL}/getAllArticle`
  })
}

// 获取全部文章的数量
export function getAllCount() {
  return request({
    method: 'get',
    url: `${BASE_ARTICLE_URL}/getAllCount`
  })
}


// 通过当个分类获取文章列表结果
export function getSingleclassifyRes(classname, limit = 3, offset = 0) {
  return request({
    method: 'get',
    url: `${BASE_ARTICLE_URL}/list/Singleclassify`,
    params: {
      classname,
      limit,
      offset
    }
  })
}

// 获取全部文章的单页文章
export function getSinglePageArticleList(config) {
  return request({
    method: 'get',
    url: `${BASE_ARTICLE_URL}/getSinglePageArticleList`,
    params: {
      ...config
    }
  })
}
