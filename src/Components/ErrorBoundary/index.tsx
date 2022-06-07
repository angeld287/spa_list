import React, { ErrorInfo, ReactNode } from "react";
import PropTypes from 'prop-types'
import { BugFilled } from '@ant-design/icons'

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
}


class ErrorBoundary extends React.Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Puedes renderizar cualquier interfaz de repuesto
            return (
                <>
                    <BugFilled style={{ fontSize: '50px', color: 'red' }} />;
                    <h1>Something went wrong.</h1>
                </>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
