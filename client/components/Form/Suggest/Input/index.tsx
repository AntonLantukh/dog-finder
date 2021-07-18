import React, {ChangeEvent, FocusEvent, KeyboardEvent, MutableRefObject, FunctionComponent} from 'react';

import css from './style.scss';

type Props = {
    value: string;
    isPending: boolean;
    inputEl: MutableRefObject<HTMLInputElement | null>;
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onInputFocus: (e: FocusEvent<HTMLInputElement>) => void;
    onInputBlur: (e: FocusEvent<HTMLInputElement>) => void;
    onInputKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
};

const Input: FunctionComponent<Props> = ({
    value,
    isPending,
    inputEl,
    onInputChange,
    onInputFocus,
    onInputBlur,
    onInputKeyDown,
}: Props) => (
    <>
        <label className={css.suggest__label} id="suggest-label" htmlFor="suggest">
            Pick-up Location
        </label>
        <input
            className={css.suggest__input}
            ref={inputEl}
            type="text"
            id="suggest"
            name="suggest"
            value={value}
            placeholder="city, airport, station, region, district…"
            aria-required="true"
            aria-autocomplete="both"
            aria-haspopup="true"
            aria-owns="sugges-results"
            aria-describedby="suggest-label"
            autoComplete="off"
            onInput={onInputChange}
            onFocus={onInputFocus}
            onBlur={onInputBlur}
            onKeyDown={onInputKeyDown}
        />
        {isPending ? (
            <img
                alt=""
                className={css.suggest__pending}
                src="https://cdn2.rcstatic.com/images/site_graphics/newsite/preloader64.gif"
            />
        ) : null}
    </>
);

export default Input;
