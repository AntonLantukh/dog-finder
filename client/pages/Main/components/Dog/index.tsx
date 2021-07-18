import React, {FunctionComponent} from 'react';

import css from './style.css';

type DogProps = {
    dog: string;
};

const Dog: FunctionComponent<DogProps> = ({dog}) => (
    <section className={css.dog}>
        <img className={css.dog__image} src={dog} alt="Dog" />
    </section>
);

export default Dog;
