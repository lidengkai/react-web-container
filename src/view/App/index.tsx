import classnames from 'classnames'
import styles from './style.less'
import { Props } from './interface'
import { Provider } from 'react-redux'
import store from '@/store'
import Page from './containers/Page'
import Layout from './containers/Layout'

const App: FC<Props> = memo(() => {
  return (
    <Provider store={store}>
      <Page defaultElement={<Layout />} />
    </Provider>
  )
})

export default App
