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
import { Breadcrumb, Card, Row, Col, Alert } from 'antd'

const Home: FC<Props> = memo(() => {
  useUnmount(unmount)
  const loading = useSelector(state => state.test.loading)

  useEffect(() => {
    initPage()
  }, [])

  return (
    <>
      <Breadcrumb className={styles.breadcrumb} items={[{ title: '测试' }]} />
      <Alert showIcon type="info" message="仅Test(role=2)可见" />
      <Card className={styles.card}>
        <Row gutter={8} className={styles.line}>
          <Col span={8} className={styles.left}>权限:</Col>
          <Col span={16} className={styles.right}>仅test用户可访问</Col>
        </Row>
      </Card>
      <Loading show={loading} />
    </>
  )
})

export default Home
