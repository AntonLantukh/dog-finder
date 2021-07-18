import React, {FunctionComponent} from 'react';

import css from './style.scss';

type BreedProps = {
    breed: string | null;
};

const getContent = (breed: string | null) =>
    breed
        ? `Your dog's breed is ${breed}. Nice choice! Look at other dogs of the same breed.`
        : 'Ooops! We could not find the breed! Maybe you have just created a new one? 🤔';

const Breed: FunctionComponent<BreedProps> = ({breed}) => {
    return (
        <div className={css.breed}>
            <span>{getContent(breed)}</span>
        </div>
    );
};

export default Breed;
