import { configureStore } from '@reduxjs/toolkit'

import app from '@/view/App/flow/reducer'
import login from '@/view/Login/flow/reducer'
import home from '@/view/Home/flow/reducer'
import test from '@/view/Test/flow/reducer'

export const store = configureStore({
  reducer: {
    [app.name]: app.reducer,
    [login.name]: login.reducer,
    [home.name]: home.reducer,
    [test.name]: test.reducer,
  }
})

/** 统一初始化 */
export const resetState = () => {
  store.dispatch(app.actions.init())
  store.dispatch(login.actions.init())
  store.dispatch(home.actions.init())
  store.dispatch(test.actions.init())
}

export default store
export const { dispatch, getState } = store
