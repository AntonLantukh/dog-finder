import React, {FunctionComponent} from 'react';

import css from './style.css';

import dog from './dog.jpeg';

const Dog: FunctionComponent = () => (
    <section className={css.dog}>
        <img className={css.dog__image} width="200" height="300" src={dog} alt="Dog" />
    </section>
);

export default Dog;
