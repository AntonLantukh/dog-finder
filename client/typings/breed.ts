import {STATUS} from '../constants/status';

type StatusEnum = keyof typeof STATUS;

export type BreedWithUrl = {
    message: string[];
    status: StatusEnum;
};

export type Breeds = Record<string, string[]>;

export type BreedList = {
    message: Breeds;
    status: StatusEnum;
};
