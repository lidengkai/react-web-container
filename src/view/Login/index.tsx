import classnames from 'classnames'
import styles from './style.less'
import { Props } from './interface'
import { useUnmount } from 'ahooks'
import {
  unmount,
  initPage,
} from './flow/action'
import UserInfo from './containers/UserInfo'

const Login: FC<Props> = memo(() => {
  useUnmount(unmount)

  useEffect(() => {
    initPage()
  }, [])

  return (
    <>
      <div className={styles.root}>
        <div className={styles.content}>
          <UserInfo />
        </div>
      </div>
    </>
  )
})

export default Login
