/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { Descriptions } from 'antd'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import 'antd/dist/antd.css'

class Personal extends Component {
  render () {
    const { username, password, token } = this.props.user
    return <Descriptions title="User Info">
    <Descriptions.Item label="UserName">{username}</Descriptions.Item>
    <Descriptions.Item label="Password">{password}</Descriptions.Item>
    <Descriptions.Item label="Token">{token}</Descriptions.Item>
  </Descriptions>
  }
}
const mapStateToProps = (state) => ({ user: state.user })
export default withRouter(connect(mapStateToProps, null)(Personal))
