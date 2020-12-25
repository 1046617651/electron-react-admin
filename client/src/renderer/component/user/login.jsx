/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import 'antd/dist/antd.css'
import { Row, Col, Card, Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './style.css'
import { login_in_action } from './action'

const base64Img = 'https://desk-fd.zol-img.com.cn/t_s1440x900c5/g6/M00/04/0D/ChMkKl-3jyuIYeYRAAuEPzwPt90AAFlsgFpcwAAC4RX412.jpg'
class Login extends Component {
  constructor (props) {
    super(props)
    this.onFinish = this.onFinish.bind(this)
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
                    message: 'Please input your Username!'
                  }
                ]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!'
                  }
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle shouldUpdate>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="" >
                Forgot password
                </a>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button>
                  Or <a href="">register now!</a>
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
