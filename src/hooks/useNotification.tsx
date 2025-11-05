import { useState, useCallback } from 'react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface UseNotificationOptions {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  maxNotifications?: number;
}

export const useNotification = (options: UseNotificationOptions = {}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const position = options.position || 'top-right';
  const maxNotifications = options.maxNotifications || 5;

  const showNotification = useCallback(
    (notification: Omit<Notification, 'id'>) => {
      const id = Date.now().toString();
      const newNotification: Notification = {
        id,
        duration: 5000,
        type: 'info',
        ...notification,
      };

      setNotifications((prev) => {
        const updated = [...prev, newNotification];
        // Keep only the most recent notifications
        if (updated.length > maxNotifications) {
          return updated.slice(-maxNotifications);
        }
        return updated;
      });

      // Auto-remove notification after duration
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, newNotification.duration);
    },
    [maxNotifications, position]
  );

  const hideNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    showNotification,
    hideNotification,
    clearNotifications,
  };
};
