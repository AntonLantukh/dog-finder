import {PLACE} from '../constants/location';

type PlaceTypeEnum = keyof typeof PLACE;

export type Location = {
    country: string;
    lng: number;
    searchType: string;
    alternative: string[];
    index: number;
    bookingId: string;
    placeType: PlaceTypeEnum;
    placeKey: string;
    iata?: string;
    countryIso: string;
    locationId: string;
    name: string;
    ufi: number;
    isPopular: boolean;
    region: string;
    lang: string;
    lat: number;
};
