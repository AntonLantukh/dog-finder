import axios, {AxiosResponse} from 'axios';

import type {BreedWithUrl} from 'client/typings/breed';

const DEFAULT_NUMBER = 6;

type Params = {
    dogsCount?: number;
    breed: string[];
};

type BackResponse = BreedWithUrl;

export default ({dogsCount = DEFAULT_NUMBER, breed}: Params): Promise<BackResponse> =>
    axios
        .get(`https://dog.ceo/api/breed/${breed.join('/')}/images/random/${dogsCount}`)
        .then(({data}: AxiosResponse<BackResponse>) => data);
