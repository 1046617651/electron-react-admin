import { LOG_IN, LOG_OUT, LOG_FAIL } from './constant'
import { POST } from '../../util/request'
import { history } from '../../history'
function _login_in (data) {
  return {
    type: LOG_IN,
    payload: { ...data }
  }
}
function _login_fail (data) {
  return {
    type: LOG_FAIL,
    payload: { ...data }
  }
}
export function login_in_action ({ username, password, remember }) {
  return (dispatch) => {
    return POST('users/login', { username, password }).then(({ code, result, message }) => {
      if (code === 0) {
        result.remember = remember
        dispatch(_login_in(result))
        history.push('/upload/list')
      } else {
        dispatch(_login_fail({ message }))
      }
    // eslint-disable-next-line node/handle-callback-err
    }).catch(err => {
      dispatch(_login_fail({ message: '登录异常！' }))
    })
  }
}

export function login_out_action () {
  history.push('/')
  return {
    type: LOG_OUT
  }
}
