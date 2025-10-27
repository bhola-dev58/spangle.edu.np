import React, { useEffect } from 'react';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Notification = ({ 
  type = 'info', 
  title, 
  message, 
  isVisible = false, 
  onClose,
  autoClose = true,
  duration = 5000 
}) => {
  useEffect(() => {
    if (isVisible && autoClose) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, autoClose, duration, onClose]);

  if (!isVisible) return null;

  const typeConfig = {
    success: {
      icon: CheckCircleIcon,
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-700',
      iconColor: 'text-green-500',
      titleColor: 'text-green-800 dark:text-green-200',
      messageColor: 'text-green-700 dark:text-green-300'
    },
    error: {
      icon: ExclamationTriangleIcon,
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-700',
      iconColor: 'text-red-500',
      titleColor: 'text-red-800 dark:text-red-200',
      messageColor: 'text-red-700 dark:text-red-300'
    },
    info: {
      icon: InformationCircleIcon,
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-700',
      iconColor: 'text-blue-500',
      titleColor: 'text-blue-800 dark:text-blue-200',
      messageColor: 'text-blue-700 dark:text-blue-300'
    }
  };

  const config = typeConfig[type];
  const IconComponent = config.icon;

  return (
    <div className={`fixed top-20 right-4 z-50 max-w-sm w-full ${config.bgColor} ${config.borderColor} border rounded-lg shadow-lg p-4 animate-fade-in transform transition-all duration-300`}>
      <div className="flex items-start">
        <IconComponent className={`h-5 w-5 ${config.iconColor} mt-0.5 mr-3 flex-shrink-0`} />
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className={`text-sm font-medium ${config.titleColor} mb-1`}>
              {title}
            </h4>
          )}
          {message && (
            <p className={`text-sm ${config.messageColor}`}>
              {message}
            </p>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={`ml-2 ${config.iconColor} hover:opacity-75 transition-opacity flex-shrink-0`}
            aria-label="Close notification"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </div>
      
      {/* Progress bar for auto-close */}
      {autoClose && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 rounded-b-lg overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-b-lg animate-progress"
            style={{ 
              animation: `progress ${duration}ms linear forwards` 
            }}
          />
        </div>
      )}
      
      <style jsx>{`
        @keyframes progress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
        .animate-progress {
          animation: progress ${duration}ms linear forwards;
        }
      `}</style>
    </div>
  );
};

export default Notification;
