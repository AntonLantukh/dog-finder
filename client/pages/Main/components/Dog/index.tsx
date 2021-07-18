import React, {FunctionComponent, useState, useCallback} from 'react';

import css from './style.scss';

import img from './image.svg';

type DogProps = {
    dog: string;
};

const Dog: FunctionComponent<DogProps> = ({dog}) => {
    const [url, setUrl] = useState(img);

    const onLoad = useCallback(() => {
        setUrl(dog);
    }, [dog]);

    return (
        <section className={css.dog}>
            <img onLoad={onLoad} className={css.dog__image} src={url} alt="Dog" />
        </section>
    );
};

export default Dog;
