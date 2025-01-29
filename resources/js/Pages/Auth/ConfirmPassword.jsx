import { useState } from 'react'
import { Form, Input, Button, Alert } from 'antd'
import { IconLock, IconShieldLock } from '@tabler/icons-react'
import { router } from '@inertiajs/react'
import AuthLayout from '@/Layouts/AuthLayout'

const ConfirmPassword = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const onFinish = (values) => {
    setLoading(true)
    setError(null)

    router.post(route('password.confirm'), {
      password: values.password
    }, {
      onError: (errors) => {
        setError(errors.password)
        form.setFields([{
          name: 'password',
          errors: [errors.password]
        }])
      },
      onFinish: () => {
        setLoading(false)
      }
    })
  }

  return (
    <AuthLayout title="Confirm Password">
      <div>
        {/* Security Icon */}
        <div className="text-center mb-6">
          <IconShieldLock size={48} className="text-blue-500" />
        </div>

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
          This is a secure area of the application. Please confirm your password before continuing.
        </div>

        {/* Form */}
        <Form
          form={form}
          name="confirm-password"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
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

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              disabled={loading}
              className="w-full"
            >
              Confirm Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </AuthLayout>
  )
}

export default ConfirmPassword
