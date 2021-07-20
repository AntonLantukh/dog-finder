import React, {FunctionComponent} from 'react';
import cn from 'classnames';

import css from './style.scss';

import Dog from '../Dog';

type DogsListProps = {
    dogs: string[];
};

const DogsList: FunctionComponent<DogsListProps> = ({dogs}) => (
    <div className={cn(css.dogs)}>
        {dogs.map((dog, key) => (
            <Dog {...{dog}} key={key} />
        ))}
    </div>
);

export default DogsList;
