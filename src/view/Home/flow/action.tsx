import { Store } from '../interface'
import { dispatch } from '@/store'
import reducer from './reducer'
import history from '@/history'
import { message } from 'antd'

const {
  init,
  commit,
} = reducer.actions

export const unmount = async () => {
  dispatch(init())
}

export const initPage = async () => {
}
