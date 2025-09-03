import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Check if the error is from a browser extension
    if (error.message && error.message.includes('chrome-extension')) {
      console.warn('Error from browser extension detected:', error);
      return;
    }
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Check if the error is from a browser extension
      if (this.state.error && this.state.error.message && 
          this.state.error.message.includes('chrome-extension')) {
        return this.props.children; // Continue rendering the app
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-DEFAULT transition-colors duration-300">
          <div className="text-center p-8 max-w-md bg-white dark:bg-dark-light rounded-lg shadow-lg border border-gray-100 dark:border-gray-600">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-2xl font-bold">!</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We're sorry, but there was an error loading this page. 
              Please try refreshing or contact support if the problem persists.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200 font-medium"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 