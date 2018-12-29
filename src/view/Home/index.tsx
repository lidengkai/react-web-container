import classnames from 'classnames'
import styles from './style.less'
import { Props } from './interface'
import { useSelector } from 'react-redux'
import { useUnmount } from 'ahooks'
import {
  unmount,
  initPage,
} from './flow/action'
import Loading from '@/component/Loading'
import { Breadcrumb, Card, Row, Col } from 'antd'

const Home: FC<Props> = memo(() => {
  useUnmount(unmount)
  const loading = useSelector(state => state.home.loading)

  useEffect(() => {
    initPage()
  }, [])

  return (
    <>
      <Breadcrumb className={styles.breadcrumb} items={[{ title: '首页' }]} />
      <Card className={styles.card}>
        <Row gutter={8} className={styles.line}>
          <Col span={8} className={styles.left}>version:</Col>
          <Col span={16} className={styles.right}>{$APP_VERSION}</Col>
        </Row>
      </Card>
      <Loading show={loading} />
    </>
  )
})

export default Home
