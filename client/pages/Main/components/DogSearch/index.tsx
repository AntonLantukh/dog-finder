import React, {useState, FunctionComponent, useCallback, useEffect, RefObject} from 'react';

import getBreeds from 'client/api/dog/getBreeds';
import getDogs from 'client/api/dog/getDogs';
import getPredictions from 'client/api/tensorflow/getPredictions';

import Uploader from '../Uploader';
import Breed from '../Breed';
import DogsList from '../DogsList';
import Spinner from '../Spinner';

import type {Prediction} from 'client/typings/prediction';
import type {Breeds} from 'client/typings/breed';

import {validateFile} from '../../utils/validation';

import {useIntersection} from './hooks/useIntersection';

import css from './style.css';

const DogsRef = ({interRef}: {interRef: RefObject<HTMLDivElement>}) => <div ref={interRef}></div>;

const getBreedFromPrediction = (predictions: Prediction[], breeds: Breeds) => {
    const breedData = {
        breed: '',
        subBreed: '',
        originalBreed: '',
    };

    const mostProbableBreed = predictions.sort((a, b) => b.probability - a.probability)?.[0]?.className;

    if (!mostProbableBreed) {
        return null;
    }

    let simlarBreed;

    const parsedBreed = mostProbableBreed.trim().split(',')[0].toLowerCase();

    if (breeds[parsedBreed]) {
        simlarBreed = breeds[parsedBreed];
    }

    const breedNoSpaces = parsedBreed.split(' ').join('');

    if (breeds[breedNoSpaces]) {
        simlarBreed = breeds[parsedBreed];
    }

    simlarBreed = parsedBreed.split(' ').find(breed => {
        return breeds[breed];
    });

    return simlarBreed;
};

const DogSearch: FunctionComponent = () => {
    const [breeds, setBreeds] = useState<Breeds>({});
    const [dogs, setDogs] = useState<string[]>([]);
    const [searchActivated, setSearchActivated] = useState<boolean>(false);
    const [isPending, setIsPending] = useState<boolean>(false);
    const [breed, setBreed] = useState<string | null>(null);
    const [error, setError] = useState<any>(null);

    const {isIntersecting, interRef} = useIntersection();

    const fetchDogs = useCallback(
        async (breed: string) => {
            setIsPending(true);

            await getDogs({breed})
                .then(data => setDogs(dogs => [...dogs, ...data.message]))
                .catch(err => setError(err))
                .finally(() => setIsPending(false));
        },
        [setIsPending, setError, setDogs],
    );

    useEffect(() => {
        const getData = async () => {
            const data = await getBreeds();
            setBreeds(data.message);
        };

        void getData();
    }, []);

    useEffect(() => {
        if (isIntersecting && searchActivated && !isPending && !error) {
            void fetchDogs(breed);
        }
    }, [searchActivated, isIntersecting, isPending, fetchDogs, breed, error]);

    const onChange = useCallback(
        (files: FileList) => {
            setIsPending(true);
            setDogs(() => []);

            const file = files[0];
            const fileReader = new FileReader();

            fileReader.onload = async () => {
                const image = document.createElement('img');
                image.src = fileReader.result as string;

                const predictions = await getPredictions(fileReader).catch(err => setError(err));
                const breed = getBreedFromPrediction(predictions, breeds);

                await fetchDogs(breed);

                setBreed(breed);
                setSearchActivated(true);
                setIsPending(false);
            };
            fileReader.readAsDataURL(file);
        },
        [setIsPending, breeds, setBreed, setSearchActivated, fetchDogs, setDogs],
    );

    return (
        <div className={css.dogSearch}>
            <Uploader {...{onChange, showPreview: true, accept: '.jpg,.jpeg,.png', validateFile}} />
            {searchActivated && <Breed {...{breed}} />}
            {dogs && <DogsList {...{dogs, isPending, interRef}} />}
            {isPending && (
                <div className={css.dogSearch__spinner}>
                    <Spinner />
                </div>
            )}
            <DogsRef {...{interRef}} />
        </div>
    );
};

export default DogSearch;
