import { Store } from '../interface'
import { dispatch, resetState } from '@/store'
import reducer from './reducer'
import history from '@/history'
import { message } from 'antd'
import requestInfo from '@/api/user/Info'
import { MenuProps } from 'antd/lib/menu'
import userLogoutApi from '@/api/user/Logout'

const {
  init,
  commit,
} = reducer.actions

export const unmount = async () => {
  resetState()
}

export const initPage = async () => {
}

export const logout = async () => {
  dispatch(commit({ loading: true }))
  const res = await userLogoutApi()
  dispatch(commit({ loading: false }))
  if (res) {
    history.push('/login')
  }
}

export const getUserInfo = async () => {
  dispatch(commit({ loading: true }))
  const userInfo = await requestInfo()
  if (userInfo) {
    return dispatch(commit({ loading: false, userInfo }))
  }
  dispatch(commit({ loading: false }))
}

export const clickMenu: MenuProps['onSelect'] = async (e) => {
  history.push(e.key)
}

export const clickUserMenu: MenuProps['onClick'] = async (e) => {
  console.log('click user', e)
}
