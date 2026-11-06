'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-[4.75rem] left-1/2 z-50 flex w-[min(24rem,calc(100%-1.5rem))] max-w-[400px] -translate-x-1/2 items-center gap-2.5 rounded-full bg-neutral-900 px-4 py-3 text-xs font-bold text-white shadow-2xl dark:bg-cream-50 dark:text-neutral-900 lg:bottom-6 lg:left-auto lg:right-6 lg:w-auto lg:translate-x-0">
      <CheckCircle2 className="w-4 h-4 text-mint-400 dark:text-mint-600" />
      <span>{message}</span>
    </div>
  );
};
