import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, Sparkles } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const colorClasses = {
    primary: 'text-pink-500',
    secondary: 'text-purple-500',
    white: 'text-white',
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className={`${sizeClasses[size]} ${colorClasses[color]} ${className}`}
    >
      <Loader2 className="w-full h-full" />
    </motion.div>
  );
};

interface LoadingButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 transform';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300',
    outline: 'border-2 border-pink-500 text-pink-500 hover:bg-pink-50',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'}
        ${className}
      `}
    >
      {isLoading && <LoadingSpinner size="sm" color="white" />}
      {children}
    </motion.button>
  );
};

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
  lines?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
  lines = 1,
}) => {
  const baseClasses = 'animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]';
  
  const variantClasses = {
    text: 'rounded h-4',
    rectangular: 'rounded-lg',
    circular: 'rounded-full',
  };

  const style = {
    width: width || (variant === 'text' ? '100%' : undefined),
    height: height || (variant === 'text' ? '1rem' : variant === 'circular' ? width : undefined),
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            style={{
              ...style,
              width: index === lines - 1 ? '75%' : '100%',
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
};

interface LoadingCardProps {
  title?: string;
  description?: string;
  className?: string;
}

export const LoadingCard: React.FC<LoadingCardProps> = ({
  title = 'Loading...',
  description = 'Please wait while we fetch the data.',
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-200 dark:border-gray-700 ${className}`}
    >
      <div className="text-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-16 h-16 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <LoadingSpinner size="lg" />
        </motion.div>
        
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

interface LoadingOverlayProps {
  isVisible: boolean;
  title?: string;
  description?: string;
  progress?: number;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isVisible,
  title = 'Processing...',
  description = 'Please wait while we complete your request.',
  progress,
}) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Sparkles size={32} className="text-white" />
        </motion.div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {description}
        </p>

        {progress !== undefined && (
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full"
            />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

interface PulsingDotProps {
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const PulsingDot: React.FC<PulsingDotProps> = ({
  color = 'primary',
  size = 'md',
  className = '',
}) => {
  const colorClasses = {
    primary: 'bg-pink-500',
    secondary: 'bg-purple-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  };

  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  return (
    <div className={`relative ${className}`}>
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full`}
      />
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
        className={`absolute inset-0 ${sizeClasses[size]} ${colorClasses[color]} rounded-full`}
      />
    </div>
  );
};

// Loading state for the entire swap interface
export const SwapInterfaceLoading: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
      {/* Header skeleton */}
      <div className="text-center mb-8">
        <Skeleton variant="rectangular" width={200} height={40} className="mx-auto mb-4" />
        <Skeleton variant="text" lines={2} className="max-w-xs mx-auto" />
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-2xl">
            <Skeleton variant="circular" width={32} height={32} className="mb-2" />
            <Skeleton variant="text" className="mb-1" />
            <Skeleton variant="text" width="60%" />
          </div>
        ))}
      </div>

      {/* Input skeleton */}
      <div className="space-y-4 mb-8">
        <div className="border-2 border-gray-200 dark:border-gray-600 rounded-2xl p-4">
          <Skeleton variant="text" width="30%" className="mb-2" />
          <div className="flex items-center gap-3">
            <Skeleton variant="circular" width={32} height={32} />
            <Skeleton variant="rectangular" width="100%" height={32} />
            <Skeleton variant="rectangular" width={60} height={24} />
          </div>
        </div>

        <div className="flex justify-center">
          <Skeleton variant="circular" width={40} height={40} />
        </div>

        <div className="border-2 border-gray-200 dark:border-gray-600 rounded-2xl p-4 bg-gray-50 dark:bg-gray-700">
          <Skeleton variant="text" width="30%" className="mb-2" />
          <div className="flex items-center gap-3">
            <Skeleton variant="circular" width={32} height={32} />
            <Skeleton variant="rectangular" width="100%" height={32} />
            <Skeleton variant="rectangular" width={60} height={24} />
          </div>
        </div>
      </div>

      {/* Button skeleton */}
      <Skeleton variant="rectangular" width="100%" height={56} className="rounded-2xl" />
    </div>
  );
};