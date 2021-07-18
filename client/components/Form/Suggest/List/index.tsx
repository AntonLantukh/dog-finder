import React, {MouseEvent, KeyboardEvent, MutableRefObject, FunctionComponent} from 'react';

import {LocationRes} from 'client/api/getDogs';

import {OptionContent, OptionEmpty} from '../Option';

import css from './style.scss';

type Props = {
    onOptionKeyDown: (name: string, index: number, evt: KeyboardEvent<Element>) => void;
    onOptionClick: (name: string, evt: MouseEvent<Element>) => void;
    listEl: MutableRefObject<HTMLUListElement | null>;
    result: LocationRes;
    searchTerm: string;
    isListVisible: boolean;
};

const List: FunctionComponent<Props> = ({
    listEl,
    result,
    searchTerm,
    isListVisible,
    onOptionClick,
    onOptionKeyDown,
}: Props) => {
    const {numFound, data} = result;
    return (
        <ul
            ref={listEl}
            tabIndex={-1}
            id="suggest-results"
            className={[css.hidden, css.suggest__results, !isListVisible && css.suggest__results_hidden]
                .filter(Boolean)
                .join(' ')}
            role="listbox"
            aria-labelledby="suggest-label"
        >
            {numFound ? (
                data.map((location, i) => (
                    <OptionContent key={i} {...{index: i, location, searchTerm, onOptionClick, onOptionKeyDown}} />
                ))
            ) : (
                <OptionEmpty />
            )}
        </ul>
    );
};

export default List;
