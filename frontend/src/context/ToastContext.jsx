import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => {
      const updated = prevToasts.map(toast => 
        toast.id === id ? { ...toast, fadingOut: true } : toast
      );
      return updated;
    });

    // Actually remove it after animation
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
    }, 300);
  }, []);

  const showToast = useCallback((message, type = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type, fadingOut: false }]);
    
    // Auto remove
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div 
            key={toast.id} 
            className={`toast ${toast.type} ${toast.fadingOut ? 'fading-out' : ''}`}
          >
            <div className={`toast-icon ${toast.type}`}>
               {toast.type === 'success' && <CheckCircle size={20} className="color-success" />}
               {toast.type === 'error' && <AlertCircle size={20} className="color-error" />}
               {toast.type === 'info' && <Info size={20} className="color-info" />}
               {toast.type === 'warning' && <AlertTriangle size={20} className="color-warning" />}
            </div>
            <div className="toast-content">{toast.message}</div>
            <div className="toast-close" onClick={() => removeToast(toast.id)}>
              <X size={16} />
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
