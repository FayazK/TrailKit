import { useState } from 'react'
import { Form, Input, Button, Alert } from 'antd'
import { IconUser, IconLock, IconMail } from '@tabler/icons-react'
import { Link, router } from '@inertiajs/react'
import AuthLayout from '@/Layouts/AuthLayout'

const Register = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const onFinish = (values) => {
    setLoading(true)
    setError(null)

    router.post(route('register'), {
      name: values.name,
      email: values.email,
      password: values.password,
      password_confirmation: values.password_confirmation
    }, {
      onError: (errors) => {
        setError(Object.values(errors)[0])
      },
      onFinish: () => setLoading(false),
    })
  }

  return (
    <AuthLayout title="Create a new account">
      <div>
        {error && (
          <Alert
            message={error}
            type="error"
            className="mb-4"
          />
        )}

        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="name"
            rules={[
              { required: true, message: 'Please input your name!' },
              { min: 2, message: 'Name must be at least 2 characters!' }
            ]}
          >
            <Input
              prefix={<IconUser size={16} className="text-gray-400"/>}
              placeholder="Full Name"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email address!' }
            ]}
          >
            <Input
              prefix={<IconMail size={16} className="text-gray-400"/>}
              placeholder="Email Address"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 8, message: 'Password must be at least 8 characters!' }
            ]}
          >
            <Input.Password
              prefix={<IconLock size={16} className="text-gray-400"/>}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password_confirmation"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('The two passwords do not match!'))
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<IconLock size={16} className="text-gray-400"/>}
              placeholder="Confirm Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              disabled={loading}
              className="w-full"
            >
              Register
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            href={route('login')}
            className="text-blue-600 hover:text-blue-800"
          >
            Sign in here
          </Link>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Register
