import type userInfoApi from '@/api/user/Info'

export type Store = {
  /** 加载中 */
  loading: boolean
  /** 用户信息 */
  userInfo: userInfoApi.Result
}

export type Props = {
}

export declare namespace ContainerPage {
  type Props = {
    defaultElement: React.ReactElement
  }
}

export declare namespace ContainerLayout {
  type Props = {
  }

  type Config = RemoteContainer.RouteEntry

  type RouteConfig = Array<{
    path: string
    element?: ReactNode
    children?: RouteConfig
  }>

  type MenuConfig = Array<{
    key: string
    label: ReactNode
    icon?: ReactNode
    children?: MenuConfig
  }>
}
