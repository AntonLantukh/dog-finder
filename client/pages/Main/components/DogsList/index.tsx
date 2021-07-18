import React, {FunctionComponent} from 'react';
import cn from 'classnames';

import css from './style.css';

import Dog from '../Dog';

type DogsListProps = {
    dogs: string[];
    isPending: boolean;
};

const DogsList: FunctionComponent<DogsListProps> = ({dogs, isPending}) => (
    <div className={cn(css.dogs, !isPending && css.dogs_pending)}>
        {dogs.map((dog, key) => (
            <Dog {...{dog}} key={key} />
        ))}
    </div>
);

export default DogsList;
