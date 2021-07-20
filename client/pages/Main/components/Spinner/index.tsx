import React, {FunctionComponent} from 'react';

import spinner from './spinner.gif';

const Spinner: FunctionComponent = () => <img data-e2e="spinner" src={spinner} alt="spinner" width="60" height="60" />;

export default Spinner;
