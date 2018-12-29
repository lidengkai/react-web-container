import { Store, ContainerUserInfo } from '../interface'
import { dispatch } from '@/store'
import reducer from './reducer'
import history from '@/history'
import { message } from 'antd'
import userLoginApi from '@/api/user/Login'

const {
  init,
  commit,
} = reducer.actions

export const unmount = async () => {
  dispatch(init())
}

export const initPage = async () => {
}

export const submit = async (form: ContainerUserInfo.FormType) => {
  const { username, password } = form
  dispatch(commit({ loading: true }))
  const res = await userLoginApi({
    username,
    password,
  })
  dispatch(commit({ loading: false }))
  if (res) {
    history.replace('/')
  }
}
