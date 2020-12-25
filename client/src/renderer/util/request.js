import axios from 'axios'
import store from '../store'
import _ from 'lodash'
import status from '../../enum/status'
import { message } from 'antd'
import { useHistory } from 'react-router-dom'
const baseURL = process.env.NODE_ENV !== 'development' ? 'productURL' : 'http://127.0.0.1:8087'
function request (options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
      },
      transformResponse: [function (data) {
      }]
    })

    const state = store.getState()
    // request 拦截器
    instance.interceptors.request.use(
      config => {
        const token = state.user && state.user.token
        config.headers.Authorization = 'Bearer ' + token
        return config
      },

      error => {
        // 请求错误时
        console.log('request:', error)
        // 1. 判断请求超时
        return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
      }
    )

    // response 拦截器
    instance.interceptors.response.use(
      async response => {
        let data
        // 低版本浏览器response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
        if (_.isUndefined(response.data)) {
          data = JSON.parse(response.request.responseText)
        } else {
          data = response.data
        }
        // message.error('出现未知错误！')
        // 根据返回的code值来做不同的处理
        switch (data.code) {
          case status.OK:
            break
          case status.NOTFOUNDUSER:
            message.error('账户信息错误！')
            break
          case status.NOPROMISS:
            message.error('没有权限！')
            break
          case status.NOTPAY:
            message.error('没有购买，请先购买软件使用权！')
            break
          case status.AUTHORIZATIONEXPIRED:
            useHistory().push('/', { user: {} })
            break
          case status.RESOURCEEXIST:
            break
          default:
            // message.error('服务器异常！')
            break
        }
        return data
      },
      err => {
        // message.error('服务器异常！'+err.name)
        console.error(err)
        return Promise.reject(err) // 返回接口返回的错误信息
      }
    )

    // 请求处理
    instance(options).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

export function GET (url) {
  return request({ url, method: 'GET' })
}
export function DELETE (url) {
  return request({ url, method: 'DELETE' })
}
export function PUT (url, data) {
  return request({ url, method: 'PUT', data })
}
export function POST (url, data) {
  return request({ url, method: 'POST', data })
}
