import { useState } from 'react'
import { Button, Alert, Space } from 'antd'
import { IconMail } from '@tabler/icons-react'
import { router } from '@inertiajs/react'
import AuthLayout from '@/Layouts/AuthLayout'

const VerifyEmail = ({ status }) => {
  const [loading, setLoading] = useState(false)

  const resendEmail = () => {
    setLoading(true)
    router.post(route('verification.send'), {}, {
      onFinish: () => setLoading(false),
    })
  }

  const logout = () => {
    router.post(route('logout'))
  }

  return (
    <AuthLayout title="Verify Email Address">
      <div>
        {/* Verification Link Sent Status */}
        {status === 'verification-link-sent' && (
          <Alert
            message="A new verification link has been sent to the email address you provided during registration."
            type="success"
            showIcon
            className="mb-4"
          />
        )}

        {/* Main Content Card */}
        <div className="text-center">
          <IconMail size={48} className="mx-auto mb-4 text-blue-500" />

          <div className="text-sm text-gray-600 mb-6">
            Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.
          </div>

          <Space direction="vertical" size="middle" className="w-full">
            <Button
              type="primary"
              size="large"
              onClick={resendEmail}
              loading={loading}
              icon={<IconMail size={18} />}
              className="w-full"
            >
              Resend Verification Email
            </Button>

            <Button
              type="default"
              size="large"
              onClick={logout}
              className="w-full"
            >
              Log Out
            </Button>
          </Space>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center text-xs text-gray-500">
          Make sure to check your spam folder if you don't see the email in your inbox.
        </div>
      </div>
    </AuthLayout>
  )
}

export default VerifyEmail
