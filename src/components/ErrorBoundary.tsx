import React from 'react';

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-container">
                    <h2>Something went wrong!</h2>
                    <details>
                        <summary>Error Details</summary>
                        <pre>{this.state.error?.message}</pre>
                    </details>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;