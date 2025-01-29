import { useState } from 'react'
import { Form, Input, Button, Checkbox, Alert } from 'antd'
import { IconUser, IconLock } from '@tabler/icons-react'
import { Link, router } from '@inertiajs/react'
import AuthLayout from '@/Layouts/AuthLayout'

const Login = ({ status, canResetPassword }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const onFinish = async (values) => {
    setLoading(true)
    setError(null)

    router.post(route('login'), {
      email: values.email,
      password: values.password,
      remember: values.remember,
    }, {
      onError: (errors) => {
        setError(errors.email || errors.password || 'An error occurred during login')
      },
      onFinish: () => setLoading(false),
    })

  }

  return (
    <AuthLayout title="Sign in to your account">
      <div>
        {status && (
          <Alert
            message={status}
            type="success"
            showIcon
            className="mb-4"
          />
        )}

        {error && (
          <Alert
            message={error}
            type="error"
            className="mb-4"
          />
        )}

        <Form
          form={form}
          name="login"
          initialValues={{ remember: false }}
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email address!' },
            ]}
          >
            <Input
              prefix={<IconUser size={16} className="text-gray-400"/>}
              placeholder="Email"
              size="large"
              onChange={e => setData('email', e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<IconLock size={16} className="text-gray-400"/>}
              placeholder="Password"
              size="large"
              onChange={e => setData('password', e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <div className="flex items-center justify-between">
              <Checkbox
                onChange={e => setData('remember', e.target.checked)}
              >
                Remember me
              </Checkbox>

              {canResetPassword && (
                <Link
                  href={route('password.request')}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Forgot password?
                </Link>
              )}
            </div>
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
              Sign in
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            href={route('register')}
            className="text-blue-600 hover:text-blue-800"
          >
            Register now
          </Link>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Login
