import { Link } from '@inertiajs/react';
import { Card } from 'antd';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function AuthLayout({ children, title }) {
  return (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="mb-8">
        <Link href="/">
          <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
        </Link>
      </div>

      <Card
        className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden rounded-lg"
        bordered={false}
      >
        {title && (
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              {title}
            </h2>
          </div>
        )}

        {children}
      </Card>

      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}
