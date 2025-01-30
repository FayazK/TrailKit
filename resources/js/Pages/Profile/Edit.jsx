import { Card, Typography, Space, Form, Input, Button, Modal, Alert } from 'antd'
import { Head, usePage, Link, router } from '@inertiajs/react'
import { useState } from 'react'
import {
  IconUser,
  IconMail,
  IconLock,
  IconAlertTriangle,
} from '@tabler/icons-react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

const { Title, Text } = Typography

export default function Edit ({ mustVerifyEmail, status }) {
  const user = usePage().props.auth.user
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)

  const ProfileForm = () => {
    const [form] = Form.useForm()

    const onFinish = (values) => {
      setLoading(true)
      router.patch(route('profile.update'), {
        name: values.name,
        email: values.email,
      }, {
        preserveScroll: true,
        onError: (error) => {
          setErrors(error.response.data.errors)
        },
        onFinish: () => setLoading(false),
      })
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
            rules={[{ required: true, message: 'Please input your name!' }]}

          >
            <Input
              prefix={<IconUser className="text-gray-400" size={16}/>}
              onChange={e => setData('name', e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input
              prefix={<IconMail className="text-gray-400" size={16}/>}
              onChange={e => setData('email', e.target.value)}
            />
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

  // Update Password Form
  const PasswordForm = () => {
    const [form] = Form.useForm()
    const { data, setData, errors, put, processing, reset } = useForm({
      current_password: '',
      password: '',
      password_confirmation: '',
    })

    const onFinish = () => {
      put(route('password.update'), {
        preserveScroll: true,
        onSuccess: () => form.resetFields(),
      })
    }

    return (
      <Card className="mb-6">
        <Title level={4}>Update Password</Title>
        <Text type="secondary" className="block mb-6">
          Ensure your account is using a long, random password to stay secure.
        </Text>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Current Password"
            name="current_password"
            validateStatus={errors.current_password && 'error'}
            help={errors.current_password}
            rules={[{ required: true, message: 'Please input your current password!' }]}
          >
            <Input.Password
              prefix={<IconLock className="text-gray-400" size={16}/>}
              onChange={e => setData('current_password', e.target.value)}
            />
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
            <Input.Password
              prefix={<IconLock className="text-gray-400" size={16}/>}
              onChange={e => setData('password', e.target.value)}
            />
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
            <Input.Password
              prefix={<IconLock className="text-gray-400" size={16}/>}
              onChange={e => setData('password_confirmation', e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={processing}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }

  // Delete Account Form
  const DeleteAccount = () => {
    const [form] = Form.useForm()
    const { data, setData, delete: destroy, processing, reset, errors } = useForm({
      password: '',
    })

    const onFinish = () => {
      destroy(route('profile.destroy'), {
        preserveScroll: true,
        onSuccess: () => setDeleteModalVisible(false),
        onError: () => form.setFields([
          {
            name: 'password',
            errors: [errors.password],
          },
        ]),
      })
    }

    return (
      <Card>
        <Title level={4}>Delete Account</Title>
        <Text type="secondary" className="block mb-6">
          Once your account is deleted, all of its resources and data will be permanently deleted.
          Before deleting your account, please download any data or information that you wish to retain.
        </Text>

        <Button danger onClick={() => setDeleteModalVisible(true)}>
          Delete Account
        </Button>

        <Modal
          title={
            <Space>
              <IconAlertTriangle className="text-red-500" size={24}/>
              <span>Delete Account</span>
            </Space>
          }
          open={deleteModalVisible}
          footer={null}
          onCancel={() => setDeleteModalVisible(false)}
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
                onChange={e => setData('password', e.target.value)}
              />
            </Form.Item>

            <div className="flex justify-end gap-4">
              <Button onClick={() => setDeleteModalVisible(false)}>
                Cancel
              </Button>
              <Button danger type="primary" htmlType="submit" loading={processing}>
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
