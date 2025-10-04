'use client';

import { XMarkIcon } from '@heroicons/react/20/solid';
import React, { createContext, useContext, useState } from 'react';

type Toast = {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
};

type ToasterContextType = {
  addToast: (message: string, type: 'success' | 'error' | 'info') => void;
};

const ToasterContext = createContext<ToasterContextType | undefined>(undefined);

export const ToasterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [nextId, setNextId] = useState(1);

  const addToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToasts((prev) => [...prev, { id: nextId, message, type }]);
    setNextId((prev) => prev + 1);
    setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 3000);
  };

  return (
    <ToasterContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed right-0 bottom-0 z-40 m-4 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`relative flex w-64 items-center justify-between rounded p-4 text-white shadow-lg ${
              toast.type === 'success' ? 'bg-green-500' : toast.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
            }`}
          >
            <span>{toast.message}</span>
            <div className="relative flex items-center">
              <div className="relative flex h-6 w-6 items-center justify-center">
                <XMarkIcon
                  className="absolute z-40 h-5 w-5 cursor-pointer"
                  onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                />
                <svg className="absolute" width="24" height="24">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="timer-circle"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ToasterContext.Provider>
  );
};

export const useToaster = (): ToasterContextType => {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error('useToaster must be used within a ToasterProvider');
  }
  return context;
};
