'use client';

import { ToastContainer } from 'react-toastify';
import { useTheme } from '@/contexts/ThemeContext';

export function ThemeAwareToasts() {
  const { resolvedTheme } = useTheme();
  return (
    <ToastContainer
      position="top-right"
      autoClose={1500}
      theme={resolvedTheme}
      closeOnClick
      pauseOnHover={false}
    />
  );
}
