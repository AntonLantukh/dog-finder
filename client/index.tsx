import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import {hot} from 'react-hot-loader/root';

import '@tensorflow/tfjs-backend-webgl';

import ErrorBoundary from './components/ErrorBoundary';
import App from './App';

const HocApp = __IS_PRODUCTION__ ? App : hot(App);

const rootElement = document.getElementById('root');

ReactDOM.render(
    <StrictMode>
        <ErrorBoundary>
            <HocApp />
        </ErrorBoundary>
    </StrictMode>,
    rootElement,
);
