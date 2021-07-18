import axios, {AxiosResponse} from 'axios';

import type {BreedList} from 'client/typings/breed';

type BackResponse = BreedList;

export default (): Promise<BackResponse> =>
    axios.get('https://dog.ceo/api/breeds/list/all').then(({data}: AxiosResponse<BackResponse>) => data);
