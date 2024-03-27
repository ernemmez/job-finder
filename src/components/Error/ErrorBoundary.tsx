import React, { Component, ReactNode } from "react";

import { Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui";

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
      return (
        this.props.fallback || (
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>You're somewhere you shouldn't be :/</AlertDescription>
          </Alert>
        )
      );
    }

    return <>{this.props.children}</>;
  }
}

export default ErrorBoundary as unknown as React.FC<IErrorBoundaryProps>;
