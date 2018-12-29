import request from '@/utils/request'
import { message } from 'antd'

const userLoginApi = async (opts: userLoginApi.Opts) => {
  return request({
    url: 'user/login',
    method: 'post',
    data: opts,
  }).then((res) => {
    return res.data as userLoginApi.Result || {}
  }).catch((res) => {
    message.error(res?.message || '服务器异常')
    return false as false
  })
}

export default userLoginApi

/** 用户登录 */
declare namespace userLoginApi {
  type Opts = {
    username?: string
    password?: string
  }
  type Result = {
    id?: number | null
    role?: number | null
    username?: string | null
  }
}
