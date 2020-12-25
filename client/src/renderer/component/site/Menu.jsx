/* eslint-disable react/prop-types */
import React from 'react'
import { Menu } from 'antd'
import {
  UploadOutlined,
  UserOutlined,
  UnorderedListOutlined,
  SolutionOutlined
} from '@ant-design/icons'
import _ from 'lodash'
const { SubMenu } = Menu
const menuArray = [{
  name: 'Upload',
  value: 'upload',
  icon: UploadOutlined,
  children: [{
    name: 'List',
    value: 'list',
    icon: UnorderedListOutlined
  }, {
    name: 'Detail',
    value: 'detail',
    icon: SolutionOutlined
  }]
}, {
  name: 'Personal',
  value: 'user/personal',
  icon: UserOutlined
}]
const CustomerMenu = ({ selectedKey, select }) => {
  const openedKeys = menuArray.map(item => item.value)
  return (<Menu theme="dark" selectedKeys={[selectedKey]} defaultOpenKeys={openedKeys} mode="inline" onSelect={select}>
      {
        menuArray.map(({ name, value, icon: Icon, children }) => {
          if (_.isEmpty(children)) {
            return <Menu.Item key={`/${value}`} icon={Icon ? <Icon/> : ''}>{name}</Menu.Item>
          } else {
            return (<SubMenu key={value} icon={Icon ? <Icon/> : ''} title={name}>
            {
            children.map(({ name, value: c_value, icon: Icon }) => {
              return <Menu.Item key={`/${value}/${c_value}`} icon={Icon ? <Icon/> : ''}>{name}</Menu.Item>
            })
          }
            </SubMenu>)
          }
        })
      }
  </Menu>)
}
export default CustomerMenu
