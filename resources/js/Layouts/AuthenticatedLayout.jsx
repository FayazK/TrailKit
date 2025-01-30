import { useState } from 'react';
import { Layout, Menu, Dropdown, Avatar, Button } from 'antd';
import { Link, usePage } from '@inertiajs/react';
import {
  IconDashboard,
  IconUser,
  IconLogout,
  IconMenu2,
  IconX
} from '@tabler/icons-react';
import ApplicationLogo from '@/Components/ApplicationLogo';

const { Header, Content } = Layout;

export default function AuthenticatedLayout({ header, children }) {
  const { user } = usePage().props.auth;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // User dropdown menu items
  const userMenuItems = [
    {
      key: 'profile',
      label: (
        <Link href={route('profile.edit')} className="block w-full">
          Profile Settings
        </Link>
      ),
      icon: <IconUser size={16} />
    },
    {
      key: 'logout',
      label: (
        <Link
          href={route('logout')}
          method="post"
          as="button"
          className="block w-full text-left"
        >
          Log Out
        </Link>
      ),
      icon: <IconLogout size={16} />
    }
  ];

  // Navigation menu items
  const navigationItems = [
    {
      key: 'dashboard',
      label: (
        <Link
          href={route('dashboard')}
          className={`flex items-center ${
            route().current('dashboard') ? 'text-blue-500' : 'text-gray-600'
          }`}
        >
          <IconDashboard size={20} className="mr-2" />
          Dashboard
        </Link>
      )
    }
  ];

  // Mobile menu
  const MobileMenu = () => (
    <div
      className={`fixed inset-0 z-40 transform ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:hidden`}
    >
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setMobileMenuOpen(false)} />
      <div className="fixed inset-y-0 left-0 flex w-full max-w-xs flex-col bg-white">
        <div className="flex h-16 items-center justify-between px-6">
          <Link href="/" className="flex items-center">
            <ApplicationLogo className="h-8 w-8" />
          </Link>
          <Button
            type="text"
            icon={<IconX size={24} />}
            onClick={() => setMobileMenuOpen(false)}
          />
        </div>
        <Menu items={navigationItems} mode="inline" selectedKeys={[route().current()]} />
      </div>
    </div>
  );

  return (
    <Layout className="min-h-screen bg-gray-100">
      <Header className="flex h-16 items-center justify-between bg-white px-4 shadow-sm">
        <div className="flex items-center">
          <Button
            type="text"
            icon={<IconMenu2 size={24} />}
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden"
          />
          <Link href="/" className="flex items-center">
            <ApplicationLogo className="h-8 w-8 ml-2" />
          </Link>
          <Menu
            mode="horizontal"
            selectedKeys={[route().current()]}
            className="hidden lg:flex ml-8 border-0"
            items={navigationItems}
          />
        </div>

        <div className="flex items-center">
          <Dropdown
            menu={{ items: userMenuItems }}
            trigger={['click']}
            placement="bottomRight"
          >
            <Button type="text" className="flex items-center">
              <Avatar className="bg-blue-500">{user.name[0].toUpperCase()}</Avatar>
              <span className="ml-2 hidden md:inline">{user.name}</span>
            </Button>
          </Dropdown>
        </div>
      </Header>

      {/* Mobile Navigation */}
      <MobileMenu />

      {/* Page Header */}
      {header && (
        <div className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {header}
          </div>
        </div>
      )}

      {/* Main Content */}
      <Content className="flex-grow">
        <main className="flex-1">{children}</main>
      </Content>
    </Layout>
  );
}
