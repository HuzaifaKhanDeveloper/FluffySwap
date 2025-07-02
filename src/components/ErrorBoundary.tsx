import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('FluffySwap Error Boundary:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // Log to external service in production
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error, { extra: errorInfo });
    }
  }

  handleRefresh = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleReportBug = () => {
    const bugReportUrl = `https://github.com/HuzaifaKhanDeveloper/fluffyswap/issues/new?title=Error%20Report&body=${encodeURIComponent(
      `**Error:** ${this.state.error?.message}\n\n**Stack Trace:**\n${this.state.error?.stack}\n\n**Component Stack:**\n${this.state.errorInfo?.componentStack}`
    )}`;
    window.open(bugReportUrl, '_blank');
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl max-w-lg w-full border border-gray-200 dark:border-gray-700"
          >
            {/* Error Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <AlertTriangle size={40} className="text-red-500 dark:text-red-400" />
            </motion.div>

            {/* Error Message */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-8"
            >
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Oops! Something went wrong
              </h1>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                FluffySwap encountered an unexpected error. Don't worry, this happens sometimes! 
                Try refreshing the page or going back to the home page.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-3"
            >
              <button
                onClick={this.handleRefresh}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
              >
                <RefreshCw size={20} />
                Refresh Page
              </button>

              <button
                onClick={this.handleGoHome}
                className="w-full flex items-center justify-center gap-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-semibold transition-all duration-200"
              >
                <Home size={20} />
                Go to Home
              </button>

              <button
                onClick={this.handleReportBug}
                className="w-full flex items-center justify-center gap-3 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-6 py-3 rounded-xl font-semibold transition-all duration-200"
              >
                <Bug size={20} />
                Report Bug
              </button>
            </motion.div>

            {/* Error Details (Development Only) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <motion.details
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl"
              >
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  🔧 Developer Details
                </summary>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-xs font-semibold text-red-600 dark:text-red-400 mb-1">Error Message:</h4>
                    <pre className="text-xs text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 p-2 rounded overflow-auto">
                      {this.state.error.message}
                    </pre>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-red-600 dark:text-red-400 mb-1">Stack Trace:</h4>
                    <pre className="text-xs text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 p-2 rounded overflow-auto max-h-32">
                      {this.state.error.stack}
                    </pre>
                  </div>
                  {this.state.errorInfo && (
                    <div>
                      <h4 className="text-xs font-semibold text-red-600 dark:text-red-400 mb-1">Component Stack:</h4>
                      <pre className="text-xs text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 p-2 rounded overflow-auto max-h-32">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </motion.details>
            )}

            {/* Help Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-center"
            >
              <p className="text-xs text-gray-500 dark:text-gray-400">
                If the problem persists, please report it on our GitHub repository
              </p>
            </motion.div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for wrapping components with error boundary
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) => {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};