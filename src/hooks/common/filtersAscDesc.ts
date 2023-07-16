import { useRouter } from 'next/router';
import { useCallback } from 'react';

export const useFiltersAscDesc = () => {
    const { push, pathname, query } = useRouter();

    const sortByAverage = useCallback((by: string) => {
        return () => {
            push({
                pathname,
                query: { ...query, page: 1, average: by },
            });
        };
    }, []);

    return { sortByAverage };
};
