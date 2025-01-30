import { useState } from 'react';


export const useConfirmDialog = (initialState = false) => {
  const [visible, setVisible] = useState(initialState);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const show = () => setVisible(true);
  const hide = () => {
    setVisible(false);
    setConfirmLoading(false);
  };

  return {
    visible,
    confirmLoading,
    setConfirmLoading,
    show,
    hide,
  };
};
