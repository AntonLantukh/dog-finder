import React, {FunctionComponent} from 'react';

import logo from './logo.svg';

import css from './style.scss';

const Header: FunctionComponent = () => (
    <div className={css.header}>
        <div className={css.header__container}>
            <img src={logo} width="200px" height="200px" alt="logo" />
        </div>
    </div>
);

export default Header;
