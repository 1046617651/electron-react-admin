import React from 'react'
import { Result, Button } from 'antd'
import { history } from '../../history'
import 'antd/dist/antd.css'
const NotFound = () => {
  return (<Result
    status="404"
    title="404"
    subTitle="对不起当前页面不存在！"
    extra={<Button type="primary" onClick={() => history.push('/')}>回到主页</Button>}
  />)
}
export default NotFound
