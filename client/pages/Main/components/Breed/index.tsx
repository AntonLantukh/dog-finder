import React, {FunctionComponent} from 'react';

import css from './style.scss';

type BreedProps = {
    breed: string[];
};

const KnownBreed: FunctionComponent<{breed: string[]}> = ({breed}) => {
    const readableBreed = breed.reverse();
    const breedStr = readableBreed.join(' ');

    return (
        <span data-e2e="known-breed">{`Your dog's breed is ${breedStr}. Nice choice! Look at other dogs of the same breed.`}</span>
    );
};

const UnknownBreed = () => (
    <span data-e2e="unknown-breed">Ooops! We could not find the breed! Maybe you have just created a new one? 🤔</span>
);

const Breed: FunctionComponent<BreedProps> = ({breed}) => {
    return <div className={css.breed}>{breed.length ? <KnownBreed {...{breed}} /> : <UnknownBreed />}</div>;
};

export default Breed;
