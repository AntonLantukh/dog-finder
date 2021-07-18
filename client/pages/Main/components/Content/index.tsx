import React, {FunctionComponent} from 'react';

import Header from '../Header';
import DogsList from '../DogsList';
import Uploader from '../Uploader';

import css from './style.css';

const Content: FunctionComponent = () => (
    <div className={css.root}>
        <Header />
        <Uploader />
        <DogsList />
    </div>
);

export default Content;
