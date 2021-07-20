import {useCallback} from 'react';

import getPredictions from 'client/api/tensorflow/getPredictions';

import {getBreedFromPrediction} from '../../../utils/breed';

import type {Breeds} from 'client/typings/breed';

type FileHandlersProps = {
    breeds: Breeds;

    setIsPending: (b: boolean) => void;
    setDogs: (d: (s: string[]) => string[]) => void;
    setError: (e: any) => void;
    setSearchActivated: (a: boolean) => void;
    setBreed: (b: string[]) => void;
    fetchDogs: (b: string[]) => Promise<void>;
};

export const useFileHandlers = ({
    breeds,
    setIsPending,
    setError,
    setDogs,
    setSearchActivated,
    fetchDogs,
    setBreed,
}: FileHandlersProps): ((files: FileList) => void) =>
    useCallback(
        (files: FileList) => {
            setIsPending(true);
            setSearchActivated(false);
            setDogs(() => []);
            setError(null);

            const file = files[0];
            const fileReader = new FileReader();

            fileReader.onload = async () => {
                const predictions = await getPredictions(fileReader)
                    .catch(err => setError(err))
                    .finally(() => setIsPending(false));

                const breed = getBreedFromPrediction(predictions || [], breeds);

                await fetchDogs(breed).then(() => {
                    setBreed(breed);
                    setSearchActivated(true);
                });
            };
            fileReader.readAsDataURL(file);
        },
        [setIsPending, breeds, setBreed, setSearchActivated, fetchDogs, setDogs, setError],
    );
