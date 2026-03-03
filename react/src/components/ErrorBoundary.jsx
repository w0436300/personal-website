import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-[60vh] px-6 md:px-12 lg:px-20 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-red-600">
              Page crashed
            </h1>
            <p className="mt-4 text-gray-600">
              There is a runtime error on this page. The details below help us fix it quickly.
            </p>
            <pre className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs overflow-auto">
              {String(this.state.error?.stack || this.state.error?.message || this.state.error)}
            </pre>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

