import classnames from 'classnames'
import styles from './style.less'
import { ContainerUserInfo } from '../../interface'
import { useSelector } from 'react-redux'
import {
  submit,
} from '../../flow/action'
import { Button, Form, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'

const UserInfo: FC<ContainerUserInfo.Props> = memo(() => {
  const loading = useSelector(state => state.login.loading)
  const [form] = Form.useForm<ContainerUserInfo.FormType>()

  const initialValues = useMemo<ContainerUserInfo.FormType>(() => {
    return {
      username: '',
      password: ''
    }
  }, [])

  return (
    <>
      <Form className={styles.root}
        form={form}
        initialValues={initialValues}
        onFinish={submit}
        scrollToFirstError
      >
        <div className={styles.title}>react_antd</div>
        <Form.Item name="username"
          rules={[
            { required: true, message: '用户名不能为空' }
          ]}
        >
          <Input size="large"
            placeholder="请输入用户名"
            autoComplete="off"
            prefix={<UserOutlined />}
          />
        </Form.Item>
        <Form.Item name="password"
          rules={[
            { required: true, message: '密码不能为空' }
          ]}
        >
          <Input size="large"
            type="password"
            placeholder="请输入密码"
            autoComplete="off"
            prefix={<LockOutlined />}
          />
        </Form.Item>
        <Form.Item>
          <Button className={styles.button} type="primary" size="large" htmlType="submit" loading={loading}>
            登&nbsp;录
          </Button>
        </Form.Item>
      </Form>
    </>
  )
})

export default UserInfo
