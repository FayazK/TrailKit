import { ConfigProvider } from 'antd'

export const AdminProviders = ({ children }) => {
  return <ConfigProvider>
    {children}
  </ConfigProvider>
}
