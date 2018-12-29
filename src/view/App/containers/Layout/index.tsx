import classnames from 'classnames'
import styles from './style.less'
import { ContainerLayout } from '../../interface'
import { useSelector } from 'react-redux'
import { useUnmount } from 'ahooks'
import {
  unmount,
  logout,
  getUserInfo,
  clickMenu,
  clickUserMenu,
} from '../../flow/action'
import { Navigate, useLocation, useRoutes } from 'react-router-dom'
import { Dropdown, Layout as ALayout, Menu, Spin, Tooltip } from 'antd'
import { HomeOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons'
import projectRoute from 'remoteProject/route'

const Home = React.lazy(() => import('@/view/Home'))
const Test = React.lazy(() => import('@/view/Test'))

const Layout: FC<ContainerLayout.Props> = memo(() => {
  useUnmount(unmount)
  const loading = useSelector(state => state.app.loading)
  const userInfo = useSelector(state => state.app.userInfo)
  const username = useSelector(state => state.app.userInfo.username)
  const role = useSelector(state => state.app.userInfo.role)
  const { pathname } = useLocation()

  const config = useMemo<ContainerLayout.Config>(() => [
    {
      path: '/home',
      element: <Home />,
      menu: '首页',
      icon: <HomeOutlined />,
    },
    {
      path: '/test',
      element: <Test />,
      menu: '测试',
      icon: <SettingOutlined />,
      roles: [2],
    },
    ...projectRoute,
    {
      path: '*',
      element: <Navigate to="/home" replace />,
    },
  ], [])

  useEffect(() => {
    getUserInfo()
  }, [])

  const routeConfig = useMemo(() => {
    const func = (list: typeof config, role: number) => {
      const result: ContainerLayout.RouteConfig = []
      for (const item of list) {
        const { path, element, children, roles } = item
        if (!roles || roles.includes(role)) {
          result.push({
            path,
            element: React.isValidElement(element) ? React.cloneElement(element, { userInfo } as any) : element,
            children: func(children || [], role),
          })
        }
      }
      return result.length ? result : undefined
    }
    return role && func(config, role)
  }, [userInfo])

  const menuConfig = useMemo(() => {
    const func = (list: typeof config, role: number, top: string = '') => {
      const result: ContainerLayout.MenuConfig = []
      for (const item of list) {
        const { path, menu, icon, children, roles } = item
        if (menu && (!roles || roles.includes(role))) {
          const key = top + (/^\//.test(path) ? path : '/' + path)
          result.push({
            key,
            label: menu,
            icon,
            children: func(children || [], role, key),
          })
        }
      }
      return result.length ? result : undefined
    }
    return role && func(config, role)
  }, [role])

  const node = useRoutes(routeConfig || [])

  return (
    <>
      <ALayout className={styles.root}>
        <ALayout.Sider collapsible>
          <div className={styles.sider}>
            <div className={styles.logo} />
            <Menu className={styles.menu} theme="dark" mode="inline"
              items={menuConfig || []} selectedKeys={[pathname]} onSelect={clickMenu}
            />
          </div>
        </ALayout.Sider>
        <ALayout>
          <ALayout.Header className={styles.header}>
            <div className={styles.right}>
              <Dropdown trigger={['click']}
                menu={{
                  items: [
                    { key: 'key1', label: 'menu1' },
                    { key: 'key2', label: 'menu2' },
                    { key: 'key3', label: 'menu3' },
                  ],
                  onClick: clickUserMenu
                }}
                placement="bottomRight"
              >
                <div className={styles.item}>
                  <span>{loading ? <Spin /> : username}</span>
                </div>
              </Dropdown>
              <Tooltip title="退出登录">
                <div className={styles.item} onClick={logout}>
                  <span className={styles.icon}>
                    <LogoutOutlined />
                  </span>
                </div>
              </Tooltip>
            </div>
          </ALayout.Header>
          <ALayout.Content>{node}</ALayout.Content>
          <ALayout.Footer className={styles.footer}>&copy;lidengkai</ALayout.Footer>
        </ALayout>
      </ALayout>
    </>
  )
})

export default Layout
