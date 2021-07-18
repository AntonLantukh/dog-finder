import {useRef, useState, useCallback, useEffect, RefObject} from 'react';

type OutProps = {
    isIntersecting: boolean;
    interRef: RefObject<HTMLDivElement>;
};

export const useIntersection = (): OutProps => {
    const interRef = useRef() as RefObject<HTMLDivElement>;
    const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

    const observerCallback = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsIntersecting(true);
                } else {
                    setIsIntersecting(false);
                }
            });
        },
        [setIsIntersecting],
    );

    useEffect(() => {
        const observer = new IntersectionObserver(observerCallback, {threshold: 0.95});

        const {current} = interRef;
        if (current) observer.observe(current);

        return () => {
            if (current) observer.unobserve(current);
        };
    }, [interRef.current]);

    return {isIntersecting, interRef};
};
