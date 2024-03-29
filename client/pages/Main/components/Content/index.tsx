import React, {FunctionComponent} from 'react';

import Header from '../Header';
import DogSearch from '../DogSearch';

import css from './style.scss';

const Content: FunctionComponent = () => (
    <div className={css.root}>
        <Header />
        <DogSearch />
    </div>
);

export default Content;
