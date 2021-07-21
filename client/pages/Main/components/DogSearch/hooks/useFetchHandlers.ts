import {useEffect, useCallback} from 'react';

import getBreeds from 'client/api/dog/getBreeds';
import getDogs from 'client/api/dog/getDogs';

import type {Breeds} from 'client/typings/breed';

type FetchDogsProps = {
    setIsPending: (b: boolean) => void;
    setDogs: (d: (s: string[]) => string[]) => void;
    setError: (e: any) => void;
};

export const useFetchDogs = ({setIsPending, setDogs, setError}: FetchDogsProps): ((b: string[]) => Promise<void>) =>
    useCallback(
        async (breed: string[]): Promise<void> => {
            setIsPending(true);
            setError(null);

            if (!breed.length) {
                setIsPending(false);
                return;
            }

            return getDogs({breed})
                .then(data => setDogs((dogs: string[]) => (dogs ? [...dogs, ...data.message] : data.message)))
                .catch(err => setError(err))
                .finally(() => setIsPending(false));
        },
        [setIsPending, setDogs, setError],
    );

type FetchBreedsProps = {
    setBreeds: (b: Breeds) => void;
    setError: (e: any) => void;
};

/** Getting breeds right after page load */
export const useBreedsFetch = ({setBreeds, setError}: FetchBreedsProps) =>
    useEffect(() => {
        const getData = async () => {
            const data = await getBreeds().catch(err => setError(err));
            setBreeds(data?.message || {});
        };

        void getData();
    }, []);

type InfiniteScrollProps = {
    isIntersecting: boolean;
    isSearchActivated: boolean;
    isPending: boolean;
    error: unknown;
    breed: string[];

    fetchDogs: (b: string[]) => Promise<void>;
};

/** Fetching on infinite scroll */
export const useInfiniteDogsLoad = ({
    isSearchActivated,
    isIntersecting,
    isPending,
    breed,
    fetchDogs,
}: InfiniteScrollProps): void =>
    useEffect(() => {
        if (isIntersecting && isSearchActivated && !isPending && breed) {
            void fetchDogs(breed);
        }
    }, [isSearchActivated, isIntersecting, isPending, fetchDogs, breed]);
