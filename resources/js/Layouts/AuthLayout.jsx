import { Layout, Typography } from 'antd'
import ApplicationLogo from '@/Components/ApplicationLogo'
import { Link } from '@inertiajs/react'
import '@css/auth.css'

const { Content } = Layout
const { Title } = Typography

const AuthLayout = ({ children, title }) => {
  return (
    <Layout className="bg-transparent">
      <Content>
        <div className="flex flex-col items-center justify-center">
          {/* Main Card Container */}
          <div className="w-full max-w-md px-6">
            {/* Glossy Card */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              {/* Card Content */}
              <div className="relative px-8 pt-8 pb-10 backdrop-blur-sm">
                {/* Logo Section */}
                <div className="mb-6 text-center">
                  <Link href="/">
                    <ApplicationLogo
                      className="mx-auto h-16 w-16 fill-current text-gray-600 hover:text-gray-800 transition-colors duration-200"/>
                  </Link>
                </div>

                {/* Title */}
                {title && (
                  <Title level={4} className="text-center mb-6">
                    {title}
                  </Title>
                )}

                {/* Form Content */}
                <div className="relative z-10">
                  {children}
                </div>
              </div>
            </div>

            {/* Footer Links */}
            <div className="mt-6 text-center text-sm text-gray-500">
              <Link
                href="/"
                className="hover:text-gray-700 transition-colors duration-200"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  )
}

export default AuthLayout
