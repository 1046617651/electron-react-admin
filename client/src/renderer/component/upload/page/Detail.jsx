import React, { Component } from 'react'
import { Descriptions } from 'antd'
import { withRouter } from 'react-router-dom'
import 'antd/dist/antd.css'

class Detail extends Component {
  render () {
    return <Descriptions title="Detail">
    <Descriptions.Item label="Name">Zhou Maomao</Descriptions.Item>
    <Descriptions.Item label="CreateTime">2020-12-12</Descriptions.Item>
  </Descriptions>
  }
}

export default withRouter(Detail)
