import request from '@/utils/request'
import { message } from 'antd'

const userInfoApi = async () => {
  return request({
    url: 'user/info',
    method: 'get',
  }).then((res) => {
    return res.data as userInfoApi.Result || {}
  }).catch((res) => {
    message.error(res?.message || '服务器异常')
    return false as false
  })
}

export default userInfoApi

/** 用户信息 */
declare namespace userInfoApi {
  type Result = {
    id?: number | null
    role?: number | null
    username?: string | null
  }
}
