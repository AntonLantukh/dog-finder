import type {Prediction} from 'client/typings/prediction';
import type {Breeds} from 'client/typings/breed';

export const getBreedFromPrediction = (predictions: Prediction[], breeds: Breeds) => {
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
