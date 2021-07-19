import {load} from '@tensorflow-models/mobilenet';

import type {Prediction} from 'client/typings/prediction';

type BackResponse = Prediction[];

export default async (fileReader: FileReader): Promise<BackResponse> => {
    const image = document.createElement('img');
    image.src = fileReader.result as string;

    const predictions = await load().then(model => model.classify(image));

    return predictions;
};
