/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import 'antd/dist/antd.css'
import { Row, Col, Card, Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './style.css'
import { login_in_action } from '../user/action'

import fs from 'fs'
import path from 'path'
import { remote, shell } from 'electron'
const base64Img = 'https://desk-fd.zol-img.com.cn/t_s1440x900c5/g6/M00/04/0D/ChMkKl-3jyuIYeYRAAuEPzwPt90AAFlsgFpcwAAC4RX412.jpg'
//  fs.readFileSync(path.join(remote.app.getPath('userData'), 'image', 'tiktok', 'bg.txt')).toString()
class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      rememberMe: true
    }
    this.handleRememberMe = this.handleRememberMe.bind(this)
    this.onFinish = this.onFinish.bind(this)
  }

  handleRememberMe (e) {
    const val = e.target.value
    this.setState({
      rememberMe: val
    })
  }

  onFinish (values) {
    const { username, password, remember } = values
    this.props.login_in_action({ username, password, remember })
  }

  render () {
    return (
      <Row id="login-container" type="flex" justify="center" align="middle" style={{ minHeight: '100vh', backgroundImage: `url("${base64Img}")` }} >
        <Col span="6">
          <Card>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true
              }}
              onFinish={this.onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!'
                  }
                ]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: '请输入密码!'
                  }
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="密码"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle shouldUpdate>
                  <Checkbox>记住密码</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="" >
                  忘记密码
            </a>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  登录
            </Button>
            或 <a href="" >立即注册!</a>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    )
  }

  componentDidMount () {
    if (this.props.location.state && !this.props.location.state.remember) {
      return
    }
    if (this.props.user && this.props.user.remember) {
      const { username, password } = this.props.user
      this.props.login_in_action({ username, password, remember: true })
    }
  }
}
const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => {
  return {
    login_in_action: (payload) => dispatch(login_in_action(payload))
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
