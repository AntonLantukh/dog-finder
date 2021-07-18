import {useEffect, useCallback} from 'react';

import getBreeds from 'client/api/dog/getBreeds';
import getDogs from 'client/api/dog/getDogs';

import type {Breeds} from 'client/typings/breed';

type FetchDogsProps = {
    setIsPending: (b: boolean) => void;
    setDogs: (d: (s: string[]) => string[]) => void;
    setError: (e: any) => void;
};

export const useFetchDogs = ({setIsPending, setDogs, setError}: FetchDogsProps): ((b: string) => Promise<void>) =>
    useCallback(
        async (breed: string): Promise<void> => {
            setIsPending(true);

            return getDogs({breed})
                .then(data => setDogs((dogs: string[]) => (dogs ? [...dogs, ...data.message] : data.message)))
                .catch(err => setError(err))
                .finally(() => setIsPending(false));
        },
        [setIsPending, setDogs, setError],
    );

type FetchBreedsProps = {
    setBreeds: (b: Breeds) => void;
};

/** Getting breeds right after page load */
export const useBreedsFetch = ({setBreeds}: FetchBreedsProps) =>
    useEffect(() => {
        const getData = async () => {
            const data = await getBreeds();
            setBreeds(data.message);
        };

        void getData();
    }, []);

type InfiniteScrollProps = {
    isIntersecting: boolean;
    isSearchActivated: boolean;
    isPending: boolean;
    error: unknown;
    breed: string | null;

    fetchDogs: (b: string) => Promise<void>;
};

/** Fetching on infinite scroll */
export const useInfiniteDogsLoad = ({
    isSearchActivated,
    isIntersecting,
    isPending,
    breed,
    error,
    fetchDogs,
}: InfiniteScrollProps): void =>
    useEffect(() => {
        if (isIntersecting && isSearchActivated && !isPending && !error && breed) {
            void fetchDogs(breed);
        }
    }, [isSearchActivated, isIntersecting, isPending, fetchDogs, breed, error]);