import type {Prediction} from 'client/typings/prediction';
import type {Breeds} from 'client/typings/breed';

export const getProbableBreed = (predictions: Prediction[]): string | null => {
    const firstPrediction = predictions.sort((a, b) => b.probability - a.probability)?.[0]?.className;

    return firstPrediction ? firstPrediction.trim().split(',')[0].toLowerCase() : null;
};

export const getBreedsArray = (breeds: Breeds, prediction: string, breed: string[] = []) => {
    Object.keys(breeds).some(b => {
        if (prediction.includes(b)) {
            breed.push(b);

            if (Array.isArray(breeds[b])) {
                (breeds[b] as string[]).some(b => {
                    breed = getBreedsArray({[b]: breeds[b]}, prediction, breed);
                });
            }

            return true;
        }
    });

    return breed;
};

export const getBreedFromPrediction = (predictions: Prediction[], breeds: Breeds): string[] => {
    const mostProbableBreed = getProbableBreed(predictions);

    if (!mostProbableBreed) {
        return [];
    }

    const breed = getBreedsArray(breeds, mostProbableBreed);

    return breed;
};
