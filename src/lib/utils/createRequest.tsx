import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { objectToFormData, objectToUrlSearch } from './formatter'

const instance = axios.create({
  headers: {
    'Accept': 'application/json'
  },
  withCredentials: false
})

const logError = (opts: Parameters<typeof createRequest>[0], response: AxiosResponse | undefined) => {
  const { method = 'GET', baseURL = '', url = '', params, data } = opts
  let completeURL = ''
  if (/https?:\/\//.test(baseURL)) {
    completeURL += baseURL
  } else {
    completeURL += location.origin + location.pathname.replace(/\/[^\/]*$/, '')
    completeURL += /^\//.test(baseURL) ? baseURL : '/' + baseURL
  }
  completeURL += /^\//.test(url) ? url : '/' + url
  const search = objectToUrlSearch(params)
  const outputURL = `[${method!.toLocaleUpperCase()}:]${completeURL + search}`
  window.console.error(outputURL, data, response?.data)
}

/**
 * 请求接口
 * @param opts 配置
 * @param failCallback 失败回调 {@returns 异常时是否中断}
 */
const createRequest = <T, E>(
  opts: AxiosRequestConfig & {
    /** body格式，默认为json */
    contentType?: 'json' | 'search' | 'form'
  },
  failCallback?: (response?: AxiosResponse) => void | boolean
): AsPromise<T, E | undefined> => {
  const { contentType = 'json', ...params } = opts
  if (params.data instanceof FormData) {
    params.headers = {
      ...params.headers,
      'Content-Type': 'multiple/form-data; charset=UTF-8'
    }
  } else {
    if (contentType === 'search') {
      params.headers = {
        ...params.headers,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      }
      params.data = objectToUrlSearch(params.data, false)
    } else if (contentType === 'json') {
      params.headers = {
        ...params.headers,
        'Content-Type': 'application/json; charset=UTF-8'
      }
    } else if (contentType === 'form') {
      params.data = objectToFormData(params.data)
      params.headers = {
        ...params.headers,
        'Content-Type': 'multiple/form-data; charset=UTF-8'
      }
    }
  }
  return new Promise((resolve, reject) => {
    instance.request(params).then((response) => {
      resolve(response.data)
    }).catch((error: AxiosError) => {
      if (axios.isCancel(error as any)) {
        return
      }
      if (failCallback?.(error.response)) {
        return
      }
      logError(opts, error.response)
      reject(error.response?.data)
    })
  })
}

export default Object.assign(createRequest, {
  instance
})
