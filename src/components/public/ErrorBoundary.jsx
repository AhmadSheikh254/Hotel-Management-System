import React from 'react';
import { Link } from 'react-router-dom';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-5 pt-28 pb-20 text-center">
          <h1 className="text-2xl font-serif text-luxury-black mb-3">Something went wrong</h1>
          <p className="text-gray-500 text-sm max-w-md mb-8">
            We apologize for the inconvenience. Please refresh the page or return to the homepage.
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn-outline !px-6 !py-3"
            >
              Refresh Page
            </button>
            <Link to="/" className="btn-gold !px-6 !py-3">Go Home</Link>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
