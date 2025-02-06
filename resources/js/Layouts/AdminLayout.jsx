import { Layout, Space, theme, Menu, Button, Avatar, Breadcrumb, Flex } from 'antd'
import ApplicationLogo from '@/Components/ApplicationLogo.jsx'
import AdminMenu from '@/Components/Layout/AdminMenu.jsx'
import { IconBell, IconQuestionMark } from '@tabler/icons-react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { useRecoilState } from 'recoil'
import { SidebarAtom } from '@/helpers/atom.js'
import { SIDEBAR_WIDTH } from '@/helpers/constants.js'
import { AdminProviders } from '@/Components/Providers.jsx'

const { Header, Content, Sider } = Layout

const AdminLayout = ({ children, title, subtitle, actions, loading }) => {
  const [collapsed, setCollapsed] = useRecoilState(SidebarAtom)
  const {
    token: { colorBgContainer, colorBgLayout, colorBgMask, colorBorder },
  } = theme.useToken()
  return <AdminProviders>
    <Layout className={'min-h-screen'}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: colorBgContainer,
          padding: '0 16px',
          height: 48,
          boxShadow: '0px 1px 1px 0px ' + colorBgMask,
        }}
      >
        <Flex justify={'space-between'} className="w-full">
          <Flex gap={4} align={'center'} justify={'left'}>
            <ApplicationLogo style={{ width: '32px', marginRight: '12px' }}/>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
              onClick={() => setCollapsed(!collapsed)}
            />
          </Flex>
          <Flex gap={4} align={'center'} justify={'right'}>
            <Button type="primary" icon={<IconQuestionMark size={14}/>}/>
            <Button type="default" icon={<IconBell size={14}/>}/>
            <Space> </Space>
            <Button type={'text'}>
              <Flex gap={4} align={'center'}>
                <Avatar size={28}
                        src="https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg"/>
                Fayaz K
              </Flex>
            </Button>
          </Flex>
        </Flex>
      </Header>
      <Layout>
        <Sider
          width={SIDEBAR_WIDTH}
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          trigger={null}
          style={{
            background: colorBgLayout, borderRight: '1px solid', borderRightColor: colorBorder,
          }}
        >
          <div className="flex flex-col h-full">
            <Menu
              mode="inline"
              defaultSelectedKeys={['dashboard']}
              defaultOpenKeys={['dashboard']}
              style={{
                height: 'calc(100% - 80px)', borderRight: 0, background: colorBgLayout,
              }}
              items={AdminMenu}
            />
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
              }, {
                title: 'List',
              }, {
                title: 'App',
              },
            ]}
            style={{
              margin: '16px 0',
            }}
          />
          <Content>
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </AdminProviders>
}
export default AdminLayout
