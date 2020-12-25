import { LOG_IN, LOG_OUT } from './constant'
import _ from 'lodash'
const userKey = 'user'
const initState = JSON.parse(localStorage.getItem(userKey) || 'null')
const reducer = (defaultState = initState, action) => {
  if (action.type === LOG_IN) {
    const { payload } = action
    localStorage.setItem(userKey, JSON.stringify(payload))
    return _.cloneDeep(payload)
  } else if (action.type === LOG_OUT) {
    localStorage.removeItem(userKey)
    return null
  }
  return defaultState
}

export default { name: 'user', reducer }
