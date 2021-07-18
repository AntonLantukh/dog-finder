import axios, {AxiosResponse} from 'axios';

import type {Location} from '../typings';

const DEFAULT_NUMBER = 6;

type Params = {
    resultsNumber?: number;
    searchTerm: string;
};

type BackRes = {
    results: {
        docs: Location[];
        numFound: number;
    };
};

export type LocationRes = {
    data: Location[];
    numFound: number | null;
};

export default ({resultsNumber = DEFAULT_NUMBER, searchTerm}: Params): Promise<LocationRes> =>
    axios
        .get(
            `https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=${resultsNumber}&solrTerm=${searchTerm}`,
        )
        .then(({data: {results}}: AxiosResponse<BackRes>) => ({
            data: results.docs,
            numFound: results.numFound,
        }));
