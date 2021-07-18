import React, {useState, useRef, FunctionComponent} from 'react';

import {LocationRes} from 'client/api/getLocations';
import useOutsideClick from 'client/hooks/useOutsideClick';
import getLocations from 'client/api/getLocations';

import Announcement from './Announcement';
import Input from './Input';
import List from './List';

import {useOptionHandlers, useInputHandlers} from './hooks';

import css from './style.scss';

type Props = {
    name: string;
    onFieldChange: (name: string, value: string) => void;
};

const Suggest: FunctionComponent<Props> = ({name, onFieldChange}) => {
    const listEl = useRef<HTMLUListElement>(null);
    const inputEl = useRef<HTMLInputElement>(null);
    const suggestEl = useRef<HTMLInputElement>(null);

    const [isPending, setPending] = useState(false);
    const [isListVisible, setListVisibility] = useState(false);
    const [value, setValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [result, setResult] = useState<LocationRes>({data: [], numFound: null});

    const {onOptionClick, onOptionKeyDown} = useOptionHandlers({
        setValue,
        setListVisibility,
        listEl,
        inputEl,
        data: result.data,
        name,
        onFieldChange,
    });

    const {onInputBlur, onInputFocus, onInputKeyDown, onInputChange} = useInputHandlers({
        getData: getLocations,
        setListVisibility,
        setResult,
        setPending,
        setValue,
        setSearchTerm,
        isListVisible,
        searchTerm,
        listEl,
        data: result.data,
    });

    useOutsideClick(suggestEl, () => setListVisibility(false));

    return (
        <div className={css.suggest} ref={suggestEl}>
            <Input {...{inputEl, value, isPending, onInputFocus, onInputKeyDown, onInputBlur, onInputChange}} />
            <List {...{listEl, searchTerm, isListVisible, result, onOptionClick, onOptionKeyDown}} />
            <Announcement {...{numFound: result.numFound}} />
        </div>
    );
};

export default Suggest;
