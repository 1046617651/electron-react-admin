const files = require.context('../', true, /\.js$/)
const rootReducers = {}

files.keys().forEach(key => {
  if (key.indexOf('root_reducer.js') === -1 && key.indexOf('reducer.js') >= 0) {
    const { name, reducer } = files(key).default
    rootReducers[name] = reducer
  }
})
export default rootReducers
