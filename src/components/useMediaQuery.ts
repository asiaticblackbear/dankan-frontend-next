import { useState, useEffect } from 'react';

const isWindowDefined = typeof window !== 'undefined';

const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState<boolean>(
        isWindowDefined ? window.matchMedia(query).matches : false
    );

    useEffect(() => {
        if (!isWindowDefined) {
            return;
        }

        const mediaQueryList = window.matchMedia(query);

        const handleMediaQueryChange = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        mediaQueryList.addEventListener('change', handleMediaQueryChange);

        return () => {
            mediaQueryList.removeEventListener('change', handleMediaQueryChange);
        };
    }, [query]);

    return matches;
};

export default useMediaQuery;