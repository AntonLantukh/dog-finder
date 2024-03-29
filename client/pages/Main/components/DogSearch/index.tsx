import React, {useState, FunctionComponent, RefObject} from 'react';

import Uploader from '../Uploader';
import Breed from '../Breed';
import DogsList from '../DogsList';
import Spinner from '../Spinner';

import type {Breeds} from 'client/typings/breed';

import {validateFile as onValidate} from '../../utils/validation';

import {useIntersection} from './hooks/useIntersection';
import {useBreedsFetch, useFetchDogs, useInfiniteDogsLoad} from './hooks/useFetchHandlers';
import {useFileHandlers} from './hooks/useFileHandlers';

import css from './style.scss';

type DogSearchContentProps = {
    onChange: (f: FileList) => void;
    onValidate?: (f: FileList | null) => string | null;
    isSearchActivated: boolean;
    isPending: boolean;
    breed: string[];
    dogs: string[];
    interRef: RefObject<HTMLDivElement>;
};

export const DogSearchContent: FunctionComponent<DogSearchContentProps> = ({
    onChange,
    onValidate,
    isSearchActivated,
    isPending,
    breed,
    dogs,
    interRef,
}) => {
    return (
        <div className={css.dogSearch}>
            <Uploader {...{onChange, showPreview: true, accept: '.jpg,.jpeg,.png', onValidate}} />
            {isSearchActivated && <Breed {...{breed}} />}
            {Boolean(dogs.length) && <DogsList {...{dogs}} />}
            {isPending && (
                <div className={css.dogSearch__spinner}>
                    <Spinner />
                </div>
            )}
            <div ref={interRef}></div>
        </div>
    );
};

const DogSearch: FunctionComponent = () => {
    const [breeds, setBreeds] = useState<Breeds>({});
    const [dogs, setDogs] = useState<string[]>([]);
    const [isSearchActivated, setSearchActivated] = useState<boolean>(false);
    const [isPending, setIsPending] = useState<boolean>(false);
    const [breed, setBreed] = useState<string[]>([]);
    const [error, setError] = useState<unknown>(null);

    const {isIntersecting, interRef} = useIntersection();

    const fetchDogs = useFetchDogs({setIsPending, setDogs, setError});
    const onChange = useFileHandlers({
        breeds,
        setIsPending,
        setError,
        setDogs,
        setSearchActivated,
        fetchDogs,
        setBreed,
    });

    useBreedsFetch({setBreeds, setError});
    useInfiniteDogsLoad({isSearchActivated, isIntersecting, isPending, fetchDogs, breed, error});

    return <DogSearchContent {...{onChange, onValidate, isSearchActivated, isPending, breed, dogs, interRef}} />;
};

export default DogSearch;
