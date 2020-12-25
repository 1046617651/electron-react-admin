import _ from 'lodash'
import { ADD_UPLOAD_TASK } from './constant'
const reducer = (defaultState = { aa: 'bb' }, action) => {
  if (action.type === ADD_UPLOAD_TASK) {
    return Object.assign({}, _.cloneDeep(defaultState), { ADD_UPLOAD_TASK: true })
  }
  return defaultState
}
export default { name: 'upload', reducer }
