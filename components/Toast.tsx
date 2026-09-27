'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-6 z-50 bg-neutral-900 dark:bg-cream-50 text-white dark:text-neutral-900 px-5 py-3 rounded-full shadow-2xl font-bold text-xs flex items-center gap-2.5 animate-bounce">
      <CheckCircle2 className="w-4 h-4 text-mint-400 dark:text-mint-600" />
      <span>{message}</span>
    </div>
  );
};
