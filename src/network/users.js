import { request } from './request'
import { BASE_USERS_URL } from './BASE_URL'

export function userLogin(form) {
  return request({
    method: 'post',
    url: `${BASE_USERS_URL}/login`,
    data: {
      ...form
    }
  })
}

export function userRegister(data) {
  return request({
    method: 'post',
    url: `${BASE_USERS_URL}/register`,
    data: {
      ...data
    }
  })
}

export function getUserInfo() {
  return request({
    url: `${BASE_USERS_URL}/info`
  })
}

export function updateUser(data) {
  return request({
    method: 'post',
    url: `${BASE_USERS_URL}/updateUser`,
    data: {
      ...data
    }
  })
}

export function getInfoList() {
  return request({
    url: `${BASE_USERS_URL}/infoList`
  })
}

// 修改用户权限 ---由管理员调用
export function setAuthority(form) {
  return request({
    method: 'post',
    url: `${BASE_USERS_URL}/api/users/authority`,
    data: {
      form
    }
  })
}

// 申请博主权限 ---由用户调用
export function updateGrade(form) {
  return request({
    method: 'post',
    url: `${BASE_USERS_URL}/updateGrade`,
    data: {
      ...form
    }
  })
}