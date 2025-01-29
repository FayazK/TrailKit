import { useState } from 'react'
import { Form, Input, Button, Alert } from 'antd'
import { IconMail, IconLock } from '@tabler/icons-react'
import { router } from '@inertiajs/react'
import AuthLayout from '@/Layouts/AuthLayout'

const ResetPassword = ({ token, email: defaultEmail }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // If email is provided in the URL, set it in the form
  if (defaultEmail) {
    form.setFieldsValue({ email: defaultEmail })
  }

  const onFinish = (values) => {
    setLoading(true)
    setError(null)

    router.post(route('password.store'), {
      token: token,
      email: values.email,
      password: values.password,
      password_confirmation: values.password_confirmation
    }, {
      onError: (errors) => {
        setError(Object.values(errors)[0])
      },
      onFinish: () => setLoading(false)
    })
  }

  return (
    <AuthLayout title="Reset Password">
      <div>
        {error && (
          <Alert
            message={error}
            type="error"
            className="mb-4"
          />
        )}

        <div className="mb-4 text-sm text-gray-600">
          Please enter your email and create a new strong password for your account.
        </div>

        <Form
          form={form}
          name="reset-password"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
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
              disabled={defaultEmail !== undefined}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your new password!' },
              { min: 8, message: 'Password must be at least 8 characters!' }
            ]}
          >
            <Input.Password
              prefix={<IconLock size={16} className="text-gray-400"/>}
              placeholder="New Password"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password_confirmation"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your new password!' },
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
              placeholder="Confirm New Password"
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
              Reset Password
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Remembered your password?{' '}
          <a
            href={route('login')}
            className="text-blue-600 hover:text-blue-800"
          >
            Sign in here
          </a>
        </div>
      </div>
    </AuthLayout>
  )
}

export default ResetPassword
