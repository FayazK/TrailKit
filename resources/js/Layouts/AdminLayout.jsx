import React, { useState } from 'react'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Breadcrumb, Button, Layout, Menu, Space, theme } from 'antd'
import ApplicationLogo from '@/Components/ApplicationLogo.jsx'
import {
  IconBell,
  IconLayoutDashboard,
  IconUsers,
  IconQuestionMark,
  IconChartBar,
  IconSettings,
  IconChevronLeft,
  IconChevronRight
} from '@tabler/icons-react'

const { Header, Content, Sider } = Layout

const menuItems = [
  {
    key: 'dashboard',
    icon: <IconLayoutDashboard size={20} />,
    label: 'Dashboard',
    children: [
      {
        key: 'analysis',
        label: 'Analysis'
      },
      {
        key: 'monitor',
        label: 'Monitor'
      }
    ]
  },
  {
    key: 'user',
    icon: <IconUsers size={20} />,
    label: 'User Management',
    children: [
      {
        key: 'user-list',
        label: 'User List'
      },
      {
        key: 'user-groups',
        label: 'User Groups'
      }
    ]
  },
  {
    key: 'analytics',
    icon: <IconChartBar size={20} />,
    label: 'Analytics',
    children: [
      {
        key: 'reports',
        label: 'Reports'
      },
      {
        key: 'statistics',
        label: 'Statistics'
      }
    ]
  },
  {
    key: 'settings',
    icon: <IconSettings size={20} />,
    label: 'Settings',
    children: [
      {
        key: 'general',
        label: 'General'
      },
      {
        key: 'security',
        label: 'Security'
      }
    ]
  }
]

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1)
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1
      return {
        key: subKey,
        label: `option${subKey}`,
      }
    }),
  }
})
const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: colorBgContainer,
          padding: '0 16px',
          height: 56,
        }}
      >
        <div className="flex items-center flex-1">
          <ApplicationLogo style={{ width: '32px', marginRight: '12px' }}/>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                label: '欢迎',
              },
              {
                key: '2',
                label: '管理页',
              },
              {
                key: '3',
                label: '列表页',
              },
              {
                key: '4',
                label: (
                  <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                    Ant Design 官网外链
                  </a>
                ),
              },
            ]}
            style={{
              flex: 1,
              minWidth: 0,
              border: 'none',
            }}
          />

          <Space size={16} className="ml-auto">
            <Button type="text" icon={<IconQuestionMark size={20}/>}/>
            <Button type="text" icon={<IconBell size={20}/>}/>
            <Avatar src="/api/placeholder/32/32"/>
          </Space>
        </div>
      </Header>
      <Layout>
        <Sider
          width={260}
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          trigger={null}
          style={{
            background: colorBgContainer,
            borderRight: '1px solid rgba(0, 0, 0, 0.06)',
          }}
        >
          <div className="flex flex-col h-full">
            <Menu
              mode="inline"
              defaultSelectedKeys={['dashboard']}
              defaultOpenKeys={['dashboard']}
              style={{
                height: 'calc(100% - 80px)',
                borderRight: 0,
              }}
              items={menuItems}
            />

            {/* Collapse Toggle */}
            <Button
              type="text"
              icon={collapsed ? <IconChevronRight size={20} /> : <IconChevronLeft size={20} />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                position: 'absolute',
                bottom: '80px',
                right: 0,
                width: '100%',
                borderRadius: 0,
                borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
              }}
            />

            {/* User Profile Section */}
            <div
              style={{
                padding: collapsed ? '12px' : '12px 16px',
                borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                marginTop: 'auto',
              }}
            >
              <Space size={12} className={collapsed ? 'justify-center w-full' : ''}>
                <Avatar size={40} src="/api/placeholder/40/40" />
                {!collapsed && (
                  <div className="flex flex-col">
                    <span className="font-medium">John Doe</span>
                    <span className="text-xs text-gray-500">Administrator</span>
                  </div>
                )}
              </Space>
            </div>
          </div>
        </Sider>
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
          <Breadcrumb
            items={[
              {
                title: 'Home',
              },
              {
                title: 'List',
              },
              {
                title: 'App',
              },
            ]}
            style={{
              margin: '16px 0',
            }}
          />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
export default AdminLayout
