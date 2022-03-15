import { request } from './request'

export function savePhoto(response) {
  return request({
    method: 'post',
    url: '/api/photoWall/savePhoto',
    data: {
      response
    }
  })
}

export function getPhoto() {
  return request({
    url: '/api/photoWall/getPhoto'
  })
}

export function changeTitle(uid, title) {
  return request({
    method: 'post',
    url: '/api/photoWall/changeTitle',
    data: {
      uid, title
    }
  })
}