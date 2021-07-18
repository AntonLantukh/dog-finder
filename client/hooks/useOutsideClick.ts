import {useEffect, RefObject} from 'react';

export default (ref: RefObject<HTMLElement> | null, action: (args?: any) => void) => {
    useEffect(() => {
        const handleClickOutside = (evt: Event) => {
            if (ref?.current && !ref.current.contains(evt.target as Node)) {
                action();
            }
        };
        document.addEventListener('click', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [ref, action]);
};
