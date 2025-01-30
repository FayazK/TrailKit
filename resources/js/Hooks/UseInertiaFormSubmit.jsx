import { useState } from 'react'
import { router } from '@inertiajs/react'
import { message } from 'antd'

export const useInertiaFormSubmit = (options = {}) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const submit = (route, data, method = 'post') => {
    setLoading(true);
    setErrors({});

    router[method](route, data, {
      preserveScroll: true,
      onSuccess: () => {
        setLoading(false);
        if (options.onSuccess) {
          options.onSuccess();
        }
        message.success(options.successMessage || 'Changes saved successfully');
      },
      onError: (errors) => {
        setLoading(false);
        setErrors(errors);
        message.error(options.errorMessage || 'An error occurred');
      },
      onFinish: () => {
        setLoading(false);
        if (options.onFinish) {
          options.onFinish();
        }
      },
    });
  };

  return {
    loading,
    errors,
    submit,
    setErrors,
  };
};
