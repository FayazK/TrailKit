import { useState } from 'react'
import { Form, Input, Button, Alert } from 'antd'
import { IconMail } from '@tabler/icons-react'
import { Link, router } from '@inertiajs/react'
import AuthLayout from '@/Layouts/AuthLayout'

const ForgotPassword = ({ status }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const onFinish = (values) => {
    setLoading(true)
    setError(null)

    router.post(route('password.email'), {
      email: values.email
    }, {
      onError: (errors) => {
        setError(errors.email)
      },
      onFinish: () => {
        setLoading(false)
      }
    })
  }

  return (
    <AuthLayout title="Reset Password">
      <div>
        {/* Success Status */}
        {status && (
          <Alert
            message={status}
            type="success"
            showIcon
            className="mb-4"
          />
        )}

        {/* Error Message */}
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            className="mb-4"
          />
        )}

        {/* Description */}
        <div className="mb-4 text-sm text-gray-600">
          Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
        </div>

        {/* Form */}
        <Form
          form={form}
          name="forgot-password"
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
              Email Password Reset Link
            </Button>
          </Form.Item>
        </Form>

        {/* Back to Login Link */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Remember your password?{' '}
          <Link
            href={route('login')}
            className="text-blue-600 hover:text-blue-800"
          >
            Back to login
          </Link>
        </div>
      </div>
    </AuthLayout>
  )
}

export default ForgotPassword
