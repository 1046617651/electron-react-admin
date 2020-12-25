/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Layout, Breadcrumb } from 'antd'
import UserInfo from './UserInfo'
import Menu from './Menu'
import './style.css'
const { Header, Footer, Sider, Content } = Layout
class _Layout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: false
    }
    this.onCollapse = this.onCollapse.bind(this)
    this.changeMenu = this.changeMenu.bind(this)
  }

  changeMenu (item) {
    this.props.history.push(item.key)
  }

  onCollapse (collapsed) {
    this.setState({ collapsed })
  };

  render () {
    const { collapsed } = this.state
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" style={{
            height: '32px',
            margin: '16px',
            background: 'rgba(255, 255, 255, 0.3)'
          }} />
          <Menu selectedKey={this.props.location.pathname} select={this.changeMenu} />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ position: 'fixed', zIndex: 1, width: '100%', padding: 0, background: '#fff' }} >
          <UserInfo />
          </Header>
          <Content style={{ marginLeft: '16px', marginRight: '16px', marginTop: '64px', marginBottom: 0 }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              {
                this.props.location.pathname.split('/').filter(str => !!str).map(str => {
                  return <Breadcrumb.Item className="capitalize" key={str}>{str}</Breadcrumb.Item>
                })
              }
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360, background: '#fff' }}>
            {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    )
  }
}
const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => {
  return {}
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(_Layout))
