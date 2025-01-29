import { Head, Link } from '@inertiajs/react';
import { Typography, Layout, Space } from 'antd';
import ApplicationLogo from '@/Components/ApplicationLogo.jsx'

const { Title, Paragraph } = Typography;
const { Header, Content, Footer } = Layout;

export default function Welcome({ auth }) {
  return (
    <>
      <Head title="Welcome" />
      <Layout className="min-h-screen bg-gray-50">
        {/* Header */}
        <Header className="flex items-center justify-between bg-white shadow">
          <div className="flex items-center px-6">
            <ApplicationLogo className="h-8 w-8" />
            <span className="ml-2 text-xl font-semibold text-gray-800">TrailKit</span>
          </div>
          <nav className="px-6">
            {auth.user ? (
              <Link
                href={route('dashboard')}
                className="text-sm text-gray-700 hover:text-gray-900"
              >
                Dashboard
              </Link>
            ) : (
              <Space size={16}>
                <Link
                  href={route('login')}
                  className="text-sm text-gray-700 hover:text-gray-900"
                >
                  Log in
                </Link>
                <Link
                  href={route('register')}
                  className="text-sm text-gray-700 hover:text-gray-900"
                >
                  Register
                </Link>
              </Space>
            )}
          </nav>
        </Header>

        {/* Main Content */}
        <Content className="flex flex-col items-center justify-center p-8">
          <div className="max-w-2xl text-center">
            <Title level={1}>
              Welcome to TrailKit
            </Title>
            <Paragraph className="mt-4 text-lg text-gray-600">
              Your ultimate companion for creating and managing web applications.
              Built with Laravel and React, TrailKit provides a robust foundation
              for modern web development.
            </Paragraph>
          </div>
        </Content>

        {/* Footer */}
        <Footer className="text-center text-gray-600">
          TrailKit © {new Date().getFullYear()}
        </Footer>
      </Layout>
    </>
  );
}
