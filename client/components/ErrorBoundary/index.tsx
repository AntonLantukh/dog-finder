import React, {Component, ErrorInfo, ReactNode} from 'react';

import css from './style.scss';

type Props = {
    children: ReactNode;
};

type State = {
    hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError() {
        return {hasError: true};
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // eslint-disable-next-line no-console
        console.error(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <div className={css.error}></div>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
