/* eslint-disable react/prop-types */
import React, { Component, Fragment } from 'react'
import { Menu, Dropdown } from 'antd'
import { DownOutlined, ProfileOutlined, BarsOutlined, LogoutOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import 'antd/dist/antd.css'
import { login_out_action } from '../user/action'
function UserInfoComponent (props) {
  const { visible, overlay, visibleChange, username } = props
  return (
      <Dropdown visible={visible} onVisibleChange={visibleChange} overlay={overlay}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()} style={{ color: 'rgba(0, 0, 0, 0.85)' }}>
          {username + '  '}
          <DownOutlined />
        </a>
      </Dropdown>
  )
}
function getMenu ({ exit, personal }) {
  return (
    <Menu>
      <Menu.Item key="profile" onClick={personal} ><ProfileOutlined />Personal</Menu.Item>
      <Menu.Item key="version"><BarsOutlined />Version:0.1.0</Menu.Item>
      <Menu.Item key="quit" onClick={exit}><LogoutOutlined />Exit</Menu.Item>
    </Menu>
  )
}
class UserInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false
    }
    this.handleVisibleChange = this.handleVisibleChange.bind(this)
    this.exit = this.exit.bind(this)
    this.personal = this.personal.bind(this)
  }

  handleVisibleChange (flag) {
    this.setState({
      visible: flag
    })
  }

  exit () {
    this.props.login_out_action()
  }

  personal () {
    this.props.history.push('/user/personal')
  }

  render () {
    const menu = getMenu({ exit: this.exit, personal: this.personal })
    return <Fragment>
      <div style={{ position: 'fixed', zIndex: 99, right: '20px', margin: 0, float: 'right' }}>
        <UserInfoComponent visible={this.state.visible} username={this.props.username} overlay={menu} visibleChange={this.handleVisibleChange} ></UserInfoComponent>
      </div>
    </Fragment>
  }
}
const mapStateToProps = state => {
  return {
    username: state.user.username
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login_out_action: () => dispatch(login_out_action())
  }
}
UserInfo.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserInfo))
