import { Card, Typography, Space, Form, Input, Button, Modal, Alert } from 'antd'
import { Head, usePage, Link } from '@inertiajs/react'
import { IconUser, IconMail, IconLock, IconAlertTriangle } from '@tabler/icons-react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { useInertiaFormSubmit } from '@/Hooks/UseInertiaFormSubmit.jsx'
import { useConfirmDialog } from '@/Hooks/UseConfirmDialog.jsx'

const { Title, Text } = Typography

export default function Edit ({ mustVerifyEmail }) {
  const user = usePage().props.auth.user
  const deleteDialog = useConfirmDialog()

  const ProfileForm = () => {
    const [form] = Form.useForm()
    const { submit, loading, errors } = useInertiaFormSubmit({
      successMessage: 'Profile updated successfully',
    })

    const onFinish = (values) => {
      submit(route('profile.update'), values, 'patch')
    }

    return (
      <Card className="mb-6">
        <Title level={4}>Profile Information</Title>
        <Text type="secondary" className="block mb-6">
          Update your account's profile information and email address.
        </Text>

        <Form
          form={form}
          layout="vertical"
          initialValues={user}
          onFinish={onFinish}
        >
          <Form.Item
            label="Name"
            name="name"
            validateStatus={errors.name && 'error'}
            help={errors.name}
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input prefix={<IconUser className="text-gray-400" size={16}/>}/>
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            validateStatus={errors.email && 'error'}
            help={errors.email}
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input prefix={<IconMail className="text-gray-400" size={16}/>}/>
          </Form.Item>

          {mustVerifyEmail && user.email_verified_at === null && (
            <Alert
              message={
                <>
                  Your email address is unverified.
                  <Link
                    href={route('verification.send')}
                    method="post"
                    as="button"
                    className="ml-2 underline text-blue-600 hover:text-blue-800"
                  >
                    Click here to re-send the verification email.
                  </Link>
                </>
              }
              type="warning"
              showIcon
              className="mb-4"
            />
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }

  const PasswordForm = () => {
    const [form] = Form.useForm()
    const { submit, loading, errors } = useInertiaFormSubmit({
      successMessage: 'Password updated successfully',
      onSuccess: () => form.resetFields(),
    })

    const onFinish = (values) => {
      submit(route('password.update'), values, 'put')
    }

    return (
      <Card className="mb-6">
        <Title level={4}>Update Password</Title>
        <Text type="secondary" className="block mb-6">
          Ensure your account is using a long, random password to stay secure.
        </Text>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Current Password"
            name="current_password"
            validateStatus={errors.current_password && 'error'}
            help={errors.current_password}
            rules={[{ required: true, message: 'Please input your current password!' }]}
          >
            <Input.Password prefix={<IconLock className="text-gray-400" size={16}/>}/>
          </Form.Item>

          <Form.Item
            label="New Password"
            name="password"
            validateStatus={errors.password && 'error'}
            help={errors.password}
            rules={[
              { required: true, message: 'Please input your new password!' },
              { min: 8, message: 'Password must be at least 8 characters!' },
            ]}
          >
            <Input.Password prefix={<IconLock className="text-gray-400" size={16}/>}/>
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="password_confirmation"
            dependencies={['password']}
            validateStatus={errors.password_confirmation && 'error'}
            help={errors.password_confirmation}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator (_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('The passwords do not match!'))
                },
              }),
            ]}
          >
            <Input.Password prefix={<IconLock className="text-gray-400" size={16}/>}/>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }

  const DeleteAccount = () => {
    const [form] = Form.useForm()
    const { submit, loading, errors } = useInertiaFormSubmit({
      successMessage: 'Account deleted successfully',
      errorMessage: 'Failed to delete account',
      onSuccess: deleteDialog.hide,
    })

    const onFinish = (values) => {
      submit(route('profile.destroy'), values, 'delete')
    }

    return (
      <Card>
        <Title level={4}>Delete Account</Title>
        <Text type="secondary" className="block mb-6">
          Once your account is deleted, all of its resources and data will be permanently deleted.
          Before deleting your account, please download any data or information that you wish to retain.
        </Text>

        <Button danger onClick={deleteDialog.show}>
          Delete Account
        </Button>

        <Modal
          title={
            <Space>
              <IconAlertTriangle className="text-red-500" size={24}/>
              <span>Delete Account</span>
            </Space>
          }
          open={deleteDialog.visible}
          footer={null}
          onCancel={deleteDialog.hide}
        >
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Text className="block mb-4">
              Are you sure you want to delete your account? Once your account is deleted, all of its
              resources and data will be permanently deleted. Please enter your password to confirm
              you would like to permanently delete your account.
            </Text>

            <Form.Item
              name="password"
              validateStatus={errors.password && 'error'}
              help={errors.password}
              rules={[{ required: true, message: 'Please enter your password!' }]}
            >
              <Input.Password
                prefix={<IconLock className="text-gray-400" size={16}/>}
                placeholder="Password"
              />
            </Form.Item>

            <div className="flex justify-end gap-4">
              <Button onClick={deleteDialog.hide}>
                Cancel
              </Button>
              <Button danger type="primary" htmlType="submit" loading={loading}>
                Delete Account
              </Button>
            </div>
          </Form>
        </Modal>
      </Card>
    )
  }

  return (
    <AuthenticatedLayout
      header={
        <Title level={4} className="m-0">
          Profile
        </Title>
      }
    >
      <Head title="Profile"/>

      <div className="py-12">
        <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
          <ProfileForm/>
          <PasswordForm/>
          <DeleteAccount/>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
