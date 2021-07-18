import React, {FunctionComponent} from 'react';

import css from './style.css';

import Dog from '../Dog';

const DogsList: FunctionComponent = () => (
    <div className={css.dogs}>
        <Dog />
        <Dog />
        <Dog />
        <Dog />
        <Dog />
        <Dog />
    </div>
);

export default DogsList;
