import { ADD_UPLOAD_TASK } from './constant'
const actions = {
  add_upload_task (payload) {
    return {
      type: ADD_UPLOAD_TASK,
      payload
    }
  }
}
export default actions
