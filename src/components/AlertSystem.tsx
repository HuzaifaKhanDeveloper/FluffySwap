import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Info, 
  X,
  Clock,
  ExternalLink,
  Wallet
} from 'lucide-react';

export type AlertType = 'success' | 'error' | 'warning' | 'info' | 'loading';

export interface Alert {
  id: string;
  type: AlertType;
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  link?: {
    label: string;
    url: string;
  };
  persistent?: boolean;
}

interface AlertContextType {
  alerts: Alert[];
  addAlert: (alert: Omit<Alert, 'id'>) => string;
  removeAlert: (id: string) => void;
  clearAlerts: () => void;
  // Convenience methods
  showSuccess: (title: string, message: string, options?: Partial<Alert>) => string;
  showError: (title: string, message: string, options?: Partial<Alert>) => string;
  showWarning: (title: string, message: string, options?: Partial<Alert>) => string;
  showInfo: (title: string, message: string, options?: Partial<Alert>) => string;
  showLoading: (title: string, message: string, options?: Partial<Alert>) => string;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlerts = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlerts must be used within an AlertProvider');
  }
  return context;
};

interface AlertProviderProps {
  children: ReactNode;
  maxAlerts?: number;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ 
  children, 
  maxAlerts = 5 
}) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const addAlert = useCallback((alertData: Omit<Alert, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const alert: Alert = {
      ...alertData,
      id,
      duration: alertData.duration ?? (alertData.type === 'loading' ? undefined : 6000),
    };

    setAlerts(prev => {
      const newAlerts = [alert, ...prev];
      return newAlerts.slice(0, maxAlerts);
    });

    // Auto-remove after duration (if not persistent or loading)
    if (alert.duration && !alert.persistent && alert.type !== 'loading') {
      setTimeout(() => {
        removeAlert(id);
      }, alert.duration);
    }

    return id;
  }, [maxAlerts]);

  const removeAlert = useCallback((id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  }, []);

  const clearAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  const showSuccess = useCallback((title: string, message: string, options?: Partial<Alert>) => {
    return addAlert({ ...options, type: 'success', title, message });
  }, [addAlert]);

  const showError = useCallback((title: string, message: string, options?: Partial<Alert>) => {
    return addAlert({ ...options, type: 'error', title, message, persistent: true });
  }, [addAlert]);

  const showWarning = useCallback((title: string, message: string, options?: Partial<Alert>) => {
    return addAlert({ ...options, type: 'warning', title, message });
  }, [addAlert]);

  const showInfo = useCallback((title: string, message: string, options?: Partial<Alert>) => {
    return addAlert({ ...options, type: 'info', title, message });
  }, [addAlert]);

  const showLoading = useCallback((title: string, message: string, options?: Partial<Alert>) => {
    return addAlert({ ...options, type: 'loading', title, message, persistent: true });
  }, [addAlert]);

  const value: AlertContextType = {
    alerts,
    addAlert,
    removeAlert,
    clearAlerts,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showLoading,
  };

  return (
    <AlertContext.Provider value={value}>
      {children}
      <AlertContainer alerts={alerts} onRemove={removeAlert} />
    </AlertContext.Provider>
  );
};

interface AlertContainerProps {
  alerts: Alert[];
  onRemove: (id: string) => void;
}

const AlertContainer: React.FC<AlertContainerProps> = ({ alerts, onRemove }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm w-full">
      <AnimatePresence>
        {alerts.map((alert) => (
          <AlertComponent
            key={alert.id}
            alert={alert}
            onRemove={() => onRemove(alert.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

interface AlertComponentProps {
  alert: Alert;
  onRemove: () => void;
}

const AlertComponent: React.FC<AlertComponentProps> = ({ alert, onRemove }) => {
  const getAlertConfig = (type: AlertType) => {
    switch (type) {
      case 'success':
        return {
          icon: CheckCircle,
          bgColor: 'from-green-500 to-emerald-600',
          iconColor: 'text-green-200',
        };
      case 'error':
        return {
          icon: XCircle,
          bgColor: 'from-red-500 to-rose-600',
          iconColor: 'text-red-200',
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          bgColor: 'from-yellow-500 to-orange-600',
          iconColor: 'text-yellow-200',
        };
      case 'info':
        return {
          icon: Info,
          bgColor: 'from-blue-500 to-indigo-600',
          iconColor: 'text-blue-200',
        };
      case 'loading':
        return {
          icon: Clock,
          bgColor: 'from-purple-500 to-violet-600',
          iconColor: 'text-purple-200',
        };
      default:
        return {
          icon: Info,
          bgColor: 'from-gray-500 to-gray-600',
          iconColor: 'text-gray-200',
        };
    }
  };

  const config = getAlertConfig(alert.type);
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`bg-gradient-to-r ${config.bgColor} p-4 rounded-2xl shadow-2xl text-white relative overflow-hidden backdrop-blur-sm border border-white/20`}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse"></div>
      </div>

      <div className="relative z-10 flex items-start gap-3">
        <div className="flex-shrink-0">
          {alert.type === 'loading' ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-full bg-white/20 animate-ping"></div>
              <Icon size={20} className={config.iconColor} />
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            >
              <Icon size={20} className="text-white" />
            </motion.div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <motion.h4
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-semibold text-sm mb-1"
          >
            {alert.title}
          </motion.h4>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-white/90 leading-relaxed"
          >
            {alert.message}
          </motion.p>

          {/* Action buttons */}
          {(alert.action || alert.link) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-3 flex gap-2"
            >
              {alert.action && (
                <button
                  onClick={alert.action.onClick}
                  className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg transition-colors duration-200 font-medium"
                >
                  {alert.action.label}
                </button>
              )}
              
              {alert.link && (
                <a
                  href={alert.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg transition-colors duration-200 font-medium"
                >
                  {alert.link.label}
                  <ExternalLink size={12} />
                </a>
              )}
            </motion.div>
          )}
        </div>

        {/* Close button */}
        {!alert.persistent && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
            whileTap={{ scale: 0.9 }}
            onClick={onRemove}
            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all duration-200"
          >
            <X size={14} />
          </motion.button>
        )}
      </div>

      {/* Progress bar for timed alerts */}
      {alert.duration && !alert.persistent && alert.type !== 'loading' && (
        <motion.div
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: alert.duration / 1000, ease: 'linear' }}
          className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-full"
        />
      )}
    </motion.div>
  );
};

// Convenience hook for common alert patterns
export const useSwapAlerts = () => {
  const alerts = useAlerts();

  const showTransactionPending = (txHash: string) => {
    return alerts.showLoading(
      'Transaction Pending',
      'Your swap is being processed on the blockchain...',
      {
        link: {
          label: 'View on Etherscan',
          url: `https://sepolia.etherscan.io/tx/${txHash}`,
        },
      }
    );
  };

  const showTransactionSuccess = (txHash: string) => {
    return alerts.showSuccess(
      'Swap Completed! 🎉',
      'Your tokens have been successfully swapped!',
      {
        link: {
          label: 'View Transaction',
          url: `https://sepolia.etherscan.io/tx/${txHash}`,
        },
      }
    );
  };

  const showTransactionError = (error: string) => {
    return alerts.showError(
      'Transaction Failed',
      error || 'Unable to complete the swap. Please try again.',
      {
        action: {
          label: 'Try Again',
          onClick: () => window.location.reload(),
        },
      }
    );
  };

  const showWalletError = () => {
    return alerts.showWarning(
      'Wallet Not Connected',
      'Please connect your wallet to continue with the swap.',
      {
        action: {
          label: 'Connect Wallet',
          onClick: () => {
            // This would trigger wallet connection
            const connectButton = document.querySelector('[data-testid="rk-connect-button"]') as HTMLButtonElement;
            if (connectButton) {
              connectButton.click();
            }
          },
        },
      }
    );
  };

  const showInsufficientBalance = () => {
    return alerts.showWarning(
      'Insufficient Balance',
      'You don\'t have enough ETH for this swap.',
      {
        link: {
          label: 'Get Testnet ETH',
          url: 'https://sepoliafaucet.com/',
        },
      }
    );
  };

  const showInsufficientLiquidity = () => {
    return alerts.showWarning(
      'Insufficient Liquidity',
      'The pool doesn\'t have enough tokens for this swap amount.',
      {
        action: {
          label: 'Try Smaller Amount',
          onClick: () => {
            // This could trigger a function to suggest a smaller amount
            console.log('Suggest smaller amount');
          },
        },
      }
    );
  };

  const showUserRejection = () => {
    return alerts.showInfo(
      'Transaction Cancelled',
      'You cancelled the transaction in your wallet. No worries, try again when you\'re ready! 😊',
      {
        action: {
          label: 'Try Again',
          onClick: () => {
            // This could trigger the swap again
            console.log('Retry swap');
          },
        },
      }
    );
  };

  return {
    ...alerts,
    showTransactionPending,
    showTransactionSuccess,
    showTransactionError,
    showWalletError,
    showInsufficientBalance,
    showInsufficientLiquidity,
    showUserRejection,
  };
};