import { BaseError, ContractFunctionRevertedError, UserRejectedRequestError } from 'viem';

export enum ErrorType {
  USER_REJECTED = 'USER_REJECTED',
  INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
  INSUFFICIENT_LIQUIDITY = 'INSUFFICIENT_LIQUIDITY',
  INVALID_AMOUNT = 'INVALID_AMOUNT',
  NETWORK_ERROR = 'NETWORK_ERROR',
  CONTRACT_ERROR = 'CONTRACT_ERROR',
  WALLET_NOT_CONNECTED = 'WALLET_NOT_CONNECTED',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export interface ParsedError {
  type: ErrorType;
  title: string;
  message: string;
  suggestion?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export class ErrorHandler {
  static parse(error: unknown): ParsedError {
    console.error('Error occurred:', error);

    // Handle string errors that contain user rejection messages
    if (typeof error === 'string') {
      const errorLower = error.toLowerCase();
      if (errorLower.includes('user rejected') || 
          errorLower.includes('user denied') || 
          errorLower.includes('user cancelled') ||
          errorLower.includes('transaction signature')) {
        return {
          type: ErrorType.USER_REJECTED,
          title: 'Transaction Cancelled',
          message: 'You cancelled the transaction in your wallet.',
          suggestion: 'Try again when you\'re ready to proceed.',
        };
      }
    }

    // Handle error objects with message property
    if (error && typeof error === 'object' && 'message' in error) {
      const errorMessage = (error as any).message?.toLowerCase() || '';
      
      if (errorMessage.includes('user rejected') || 
          errorMessage.includes('user denied') || 
          errorMessage.includes('user cancelled') ||
          errorMessage.includes('transaction signature') ||
          errorMessage.includes('metamask tx signature')) {
        return {
          type: ErrorType.USER_REJECTED,
          title: 'Transaction Cancelled',
          message: 'You cancelled the transaction in your wallet.',
          suggestion: 'Try again when you\'re ready to proceed.',
        };
      }
    }

    // Handle error objects with details property (like your error)
    if (error && typeof error === 'object' && 'details' in error) {
      const details = (error as any).details?.toLowerCase() || '';
      
      if (details.includes('user denied') || 
          details.includes('user rejected') ||
          details.includes('transaction signature')) {
        return {
          type: ErrorType.USER_REJECTED,
          title: 'Transaction Cancelled',
          message: 'You cancelled the transaction in your wallet.',
          suggestion: 'Try again when you\'re ready to proceed.',
        };
      }
    }

    // Handle shortMessage property
    if (error && typeof error === 'object' && 'shortMessage' in error) {
      const shortMessage = (error as any).shortMessage?.toLowerCase() || '';
      
      if (shortMessage.includes('user rejected') || 
          shortMessage.includes('user denied')) {
        return {
          type: ErrorType.USER_REJECTED,
          title: 'Transaction Cancelled',
          message: 'You cancelled the transaction in your wallet.',
          suggestion: 'Try again when you\'re ready to proceed.',
        };
      }
    }

    // User rejected transaction
    if (error instanceof UserRejectedRequestError) {
      return {
        type: ErrorType.USER_REJECTED,
        title: 'Transaction Cancelled',
        message: 'You cancelled the transaction in your wallet.',
        suggestion: 'Try again when you\'re ready to proceed.',
      };
    }

    // Contract revert errors
    if (error instanceof ContractFunctionRevertedError) {
      const revertReason = error.data?.errorName || error.shortMessage;
      
      switch (revertReason) {
        case 'InsufficientETH':
        case 'Must send ETH':
          return {
            type: ErrorType.INVALID_AMOUNT,
            title: 'Invalid Amount',
            message: 'Please enter a valid ETH amount greater than 0.',
            suggestion: 'Check the minimum swap amount (0.001 ETH).',
          };

        case 'InsufficientTokenLiquidity':
        case 'Insufficient token liquidity':
          return {
            type: ErrorType.INSUFFICIENT_LIQUIDITY,
            title: 'Insufficient Liquidity',
            message: 'The pool doesn\'t have enough FLUF tokens for this swap.',
            suggestion: 'Try a smaller amount or add liquidity to the pool.',
          };

        case 'TransferFailed':
        case 'Token transfer failed':
          return {
            type: ErrorType.CONTRACT_ERROR,
            title: 'Transfer Failed',
            message: 'The token transfer could not be completed.',
            suggestion: 'This might be a temporary issue. Please try again.',
          };

        default:
          return {
            type: ErrorType.CONTRACT_ERROR,
            title: 'Contract Error',
            message: revertReason || 'The smart contract rejected the transaction.',
            suggestion: 'Please check your transaction parameters and try again.',
          };
      }
    }

    // Base errors from viem
    if (error instanceof BaseError) {
      const errorMessage = error.shortMessage || error.message;

      // Check for user rejection in base error
      if (errorMessage.toLowerCase().includes('user rejected') || 
          errorMessage.toLowerCase().includes('user denied')) {
        return {
          type: ErrorType.USER_REJECTED,
          title: 'Transaction Cancelled',
          message: 'You cancelled the transaction in your wallet.',
          suggestion: 'Try again when you\'re ready to proceed.',
        };
      }

      // Insufficient funds
      if (errorMessage.includes('insufficient funds') || errorMessage.includes('exceeds balance')) {
        return {
          type: ErrorType.INSUFFICIENT_FUNDS,
          title: 'Insufficient Funds',
          message: 'You don\'t have enough ETH to complete this transaction.',
          suggestion: 'Make sure you have enough ETH for both the swap and gas fees.',
          action: {
            label: 'Get Testnet ETH',
            onClick: () => window.open('https://sepoliafaucet.com/', '_blank'),
          },
        };
      }

      // Network errors
      if (errorMessage.includes('network') || errorMessage.includes('connection')) {
        return {
          type: ErrorType.NETWORK_ERROR,
          title: 'Network Error',
          message: 'Unable to connect to the Ethereum network.',
          suggestion: 'Check your internet connection and try again.',
        };
      }

      return {
        type: ErrorType.CONTRACT_ERROR,
        title: 'Transaction Error',
        message: errorMessage,
        suggestion: 'Please try again or contact support if the issue persists.',
      };
    }

    // Standard JavaScript errors
    if (error instanceof Error) {
      const errorMessage = error.message.toLowerCase();

      if (errorMessage.includes('user rejected') || 
          errorMessage.includes('user denied') ||
          errorMessage.includes('user cancelled') ||
          errorMessage.includes('transaction signature')) {
        return {
          type: ErrorType.USER_REJECTED,
          title: 'Transaction Cancelled',
          message: 'You cancelled the transaction in your wallet.',
          suggestion: 'Try again when you\'re ready to proceed.',
        };
      }

      if (errorMessage.includes('insufficient funds')) {
        return {
          type: ErrorType.INSUFFICIENT_FUNDS,
          title: 'Insufficient Funds',
          message: 'You don\'t have enough ETH for this transaction.',
          suggestion: 'Make sure you have enough ETH for both the swap and gas fees.',
        };
      }

      if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
        return {
          type: ErrorType.NETWORK_ERROR,
          title: 'Network Error',
          message: 'Unable to connect to the network.',
          suggestion: 'Check your internet connection and try again.',
        };
      }

      return {
        type: ErrorType.UNKNOWN_ERROR,
        title: 'Unexpected Error',
        message: error.message,
        suggestion: 'Please try again or refresh the page.',
      };
    }

    // String errors
    if (typeof error === 'string') {
      return {
        type: ErrorType.UNKNOWN_ERROR,
        title: 'Error',
        message: error,
        suggestion: 'Please try again.',
      };
    }

    // Unknown error type
    return {
      type: ErrorType.UNKNOWN_ERROR,
      title: 'Unknown Error',
      message: 'An unexpected error occurred.',
      suggestion: 'Please refresh the page and try again.',
    };
  }

  static getRetryStrategy(errorType: ErrorType): {
    shouldRetry: boolean;
    retryDelay?: number;
    maxRetries?: number;
  } {
    switch (errorType) {
      case ErrorType.NETWORK_ERROR:
        return { shouldRetry: true, retryDelay: 2000, maxRetries: 3 };
      
      case ErrorType.CONTRACT_ERROR:
        return { shouldRetry: true, retryDelay: 1000, maxRetries: 2 };
      
      case ErrorType.USER_REJECTED:
      case ErrorType.INSUFFICIENT_FUNDS:
      case ErrorType.INSUFFICIENT_LIQUIDITY:
      case ErrorType.INVALID_AMOUNT:
      case ErrorType.WALLET_NOT_CONNECTED:
        return { shouldRetry: false };
      
      default:
        return { shouldRetry: true, retryDelay: 1000, maxRetries: 1 };
    }
  }

  static logError(error: unknown, context?: string): void {
    const parsedError = this.parse(error);
    
    const errorLog = {
      timestamp: new Date().toISOString(),
      context,
      type: parsedError.type,
      title: parsedError.title,
      message: parsedError.message,
      originalError: error,
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    console.error('FluffySwap Error:', errorLog);

    // In production, send to error tracking service
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error, { extra: errorLog });
      // Example: analytics.track('Error Occurred', errorLog);
    }
  }
}

// Utility function for handling async operations with error parsing
export const withErrorHandling = async <T>(
  operation: () => Promise<T>,
  context?: string
): Promise<{ data?: T; error?: ParsedError }> => {
  try {
    const data = await operation();
    return { data };
  } catch (error) {
    ErrorHandler.logError(error, context);
    const parsedError = ErrorHandler.parse(error);
    return { error: parsedError };
  }
};

// Hook for handling errors with retry logic
export const useErrorHandler = () => {
  const handleError = (error: unknown, context?: string) => {
    ErrorHandler.logError(error, context);
    return ErrorHandler.parse(error);
  };

  const withRetry = async <T>(
    operation: () => Promise<T>,
    context?: string
  ): Promise<T> => {
    let lastError: unknown;
    let retryCount = 0;

    const executeWithRetry = async (): Promise<T> => {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        const parsedError = ErrorHandler.parse(error);
        const retryStrategy = ErrorHandler.getRetryStrategy(parsedError.type);

        if (retryStrategy.shouldRetry && retryCount < (retryStrategy.maxRetries || 0)) {
          retryCount++;
          console.log(`Retrying operation (${retryCount}/${retryStrategy.maxRetries}) after ${retryStrategy.retryDelay}ms`);
          
          await new Promise(resolve => setTimeout(resolve, retryStrategy.retryDelay));
          return executeWithRetry();
        }

        throw error;
      }
    };

    try {
      return await executeWithRetry();
    } catch (error) {
      ErrorHandler.logError(error, context);
      throw error;
    }
  };

  return {
    handleError,
    withRetry,
    parseError: ErrorHandler.parse,
  };
};