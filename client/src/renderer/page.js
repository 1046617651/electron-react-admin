const files = require.context('./', true, /\.jsx$/)
const routerArray = []
files.keys().forEach(key => {
  if (key.indexOf('/page/') >= 0) {
    const path = key.replace('./component', '').replace('/page/', '/').replace(/\.(js|jsx)$/, '').toLowerCase()
    routerArray.push({ path, component: files(key).default })
  }
})
export default routerArray
