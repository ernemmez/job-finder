import React, { Component, ReactNode } from "react";

import Error from "@/components/Error";

export interface IErrorBoundaryProps {
  fallback?: ReactNode;
  children: ReactNode;
}

export interface IErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    this.setState({ hasError: true, error });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <Error />;
    }

    return <>{this.props.children}</>;
  }
}

export default ErrorBoundary as unknown as React.FC<IErrorBoundaryProps>;
