import request from '@/utils/request'
import { message } from 'antd'

const userLogoutApi = async () => {
  return request({
    url: 'user/logout',
    method: 'get',
  }).then(() => {
    return true as userLogoutApi.Result
  }).catch((res) => {
    message.error(res?.message || '服务器异常')
    return false as false
  })
}

export default userLogoutApi

/** 登出 */
declare namespace userLogoutApi {
  type Result = true
}
