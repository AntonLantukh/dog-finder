import React, {MouseEvent, KeyboardEvent, memo, FunctionComponent} from 'react';

import {PLACE} from 'client/constants/location';
import type {Location} from 'client/typings/breed';

import {stringify} from '../utils';

import css from './style.scss';

type BoldifierProps = {
    location: string;
    searchTerm: string;
};

export const Boldifier: FunctionComponent<BoldifierProps> = ({location, searchTerm}: BoldifierProps) => {
    const regExp = new RegExp(searchTerm, 'i');
    const str = location.replace(regExp, '<b>$&</b>');

    return <span dangerouslySetInnerHTML={{__html: str}} />;
};

type OptionProps = {
    onOptionKeyDown: (name: string, index: number, evt: KeyboardEvent<Element>) => void;
    onOptionClick: (name: string, evt: MouseEvent<Element>) => void;
    location: Location;
    searchTerm: string;
    index: number;
};

export const OptionContent: FunctionComponent<OptionProps> = memo(
    ({location, onOptionClick, onOptionKeyDown, index, searchTerm}: OptionProps) => {
        const {country, name, isPopular, region, iata, placeType} = location;

        return (
            <li
                id={String(index)}
                role="option"
                aria-selected="false"
                className={css.option}
                tabIndex={-1}
                onKeyDown={evt => onOptionKeyDown(stringify([name, region, country]), index, evt)}
                onClick={evt => onOptionClick(stringify([name, region, country]), evt)}
            >
                <span className={[css.option__type, css[`option__type-${placeType}`]].join(' ')}>
                    {PLACE[placeType]}
                </span>
                <div className={css.option__container}>
                    <span className="option__name">
                        <Boldifier location={name} searchTerm={searchTerm} />
                        {iata ? ` (${iata})` : ''}
                    </span>
                    <span className={css.option__place}>
                        <Boldifier location={stringify([region, country])} searchTerm={searchTerm} />
                    </span>
                </div>
                {isPopular && <span className={css.option__popular}>Popular</span>}
            </li>
        );
    },
);

OptionContent.displayName = 'OptionContent';

export const OptionEmpty = memo(() => (
    <li role="option" aria-selected="false" className={css.optionEmpty}>
        No results found
    </li>
));

OptionEmpty.displayName = 'OptionEmpty';
