import {Prediction} from 'client/typings/prediction';

import {getProbableBreed, getBreedsArray, getBreedFromPrediction} from '../breed';

describe('getProbableBreed', () => {
    it('Sorts correctly and gets className with best match', () => {
        const predictions = [
            {className: 'papillon', probability: 0.003951134160161018},
            {className: 'Pomeranian', probability: 0.9925622344017029},
            {className: 'Yorkshire terrier', probability: 0.001014165347442031},
        ];

        const probableBreed = getProbableBreed(predictions);

        expect(probableBreed).toEqual('pomeranian');
    });

    it('Gets only first match from className', () => {
        const predictions = [
            {className: 'papillon', probability: 0.003951134160161018},
            {className: 'Pomeranian, best dog, really', probability: 0.9925622344017029},
            {className: 'Yorkshire terrier', probability: 0.001014165347442031},
        ];

        const probableBreed = getProbableBreed(predictions);

        expect(probableBreed).toEqual('pomeranian');
    });

    it('No predictions - no honey (null)', () => {
        const predictions: Prediction[] = [];

        const probableBreed = getProbableBreed(predictions);

        expect(probableBreed).toEqual(null);
    });
});

describe('getBreedsArray', () => {
    it('Correctly iterates and gets breeds from several levels', () => {
        const breeds = {
            finnish: ['lapphund'],
            frise: ['bichon'],
            germanshepherd: [],
            greyhound: ['italian'],
        };

        const prediction = 'italian beautiful greyhound';
        const breed: string[] = [];

        const breedArray = getBreedsArray(breeds, prediction, breed);

        expect(breedArray).toEqual(['greyhound', 'italian']);
    });

    it('Cuts not used words from prediction', () => {
        const breeds = {
            finnish: ['lapphund'],
            frise: ['bichon'],
            germanshepherd: [],
            greyhound: ['italian'],
        };

        const prediction = 'bichon dog hey hey frise lol';
        const breed: string[] = [];

        const breedArray = getBreedsArray(breeds, prediction, breed);

        expect(breedArray).toEqual(['frise', 'bichon']);
    });

    it('One level breed is also not a problem', () => {
        const breeds = {
            finnish: ['lapphund'],
            frise: ['bichon'],
            germanshepherd: [],
            greyhound: ['italian'],
        };

        const prediction = 'finnish dog';
        const breed: string[] = [];

        const breedArray = getBreedsArray(breeds, prediction, breed);

        expect(breedArray).toEqual(['finnish']);
    });

    it('No match - empty array', () => {
        const breeds = {
            finnish: ['lapphund'],
            frise: ['bichon'],
            germanshepherd: [],
            greyhound: ['italian'],
        };

        const prediction = 'ovcharka';
        const breed: string[] = [];

        const breedArray = getBreedsArray(breeds, prediction, breed);

        expect(breedArray).toEqual([]);
    });
});

describe('getBreedFromPrediction', () => {
    it('Correctly gets breed from prediction', () => {
        const breeds = {
            finnish: ['lapphund'],
            frise: ['bichon'],
            pomeranian: [],
            greyhound: ['italian'],
        };

        const predictions = [
            {className: 'papillon', probability: 0.003951134160161018},
            {className: 'Pomeranian', probability: 0.9925622344017029},
            {className: 'Yorkshire terrier', probability: 0.001014165347442031},
        ];

        const breedArray = getBreedFromPrediction(predictions, breeds);

        expect(breedArray).toEqual(['pomeranian']);
    });

    it('Correctly gets breed from prediction (2)', () => {
        const breeds = {
            finnish: ['lapphund'],
            frise: ['bichon'],
            pomeranian: [],
            greyhound: ['italian'],
        };

        const predictions = [
            {className: 'papillon', probability: 0.003951134160161018},
            {className: 'Bichon frise', probability: 0.9925622344017029},
            {className: 'Yorkshire terrier', probability: 0.001014165347442031},
        ];

        const breedArray = getBreedFromPrediction(predictions, breeds);

        expect(breedArray).toEqual(['frise', 'bichon']);
    });
});
