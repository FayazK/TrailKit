import { Layout, Card, Row, Col, Typography, Statistic } from 'antd';
import { Head } from '@inertiajs/react';
import { IconUsers, IconChartBar, IconClipboardList, IconBell } from '@tabler/icons-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const { Content } = Layout;
const { Title } = Typography;

export default function Dashboard() {
  return (
    <AuthenticatedLayout
      header={
        <Title level={4} className="text-gray-800 m-0">
          Dashboard
        </Title>
      }
    >
      <Head title="Dashboard" />

      <Content className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Statistics Cards */}
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6}>
              <Card bordered={false} className="h-full">
                <Statistic
                  title="Total Users"
                  value={1234}
                  prefix={<IconUsers size={20} className="mr-2 text-blue-500" />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card bordered={false} className="h-full">
                <Statistic
                  title="Revenue"
                  value={8234}
                  prefix="$"
                  precision={2}
                  prefix={<IconChartBar size={20} className="mr-2 text-green-500" />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card bordered={false} className="h-full">
                <Statistic
                  title="Active Projects"
                  value={12}
                  prefix={<IconClipboardList size={20} className="mr-2 text-purple-500" />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card bordered={false} className="h-full">
                <Statistic
                  title="Notifications"
                  value={5}
                  prefix={<IconBell size={20} className="mr-2 text-orange-500" />}
                />
              </Card>
            </Col>
          </Row>

          {/* Main Content Area */}
          <Row gutter={[16, 16]} className="mt-6">
            <Col xs={24} lg={16}>
              <Card
                title="Recent Activity"
                bordered={false}
                className="h-full"
              >
                <p className="text-gray-600">
                  Welcome to your dashboard! This is where you'll find an overview of your activity and important metrics.
                </p>
              </Card>
            </Col>
            <Col xs={24} lg={8}>
              <Card
                title="Quick Actions"
                bordered={false}
                className="h-full"
              >
                <p className="text-gray-600">
                  Access frequently used features and actions here.
                </p>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </AuthenticatedLayout>
  );
}
