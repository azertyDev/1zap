import { useRouter } from 'next/router';
import { useCallback } from 'react';

export const useFiltersAscDesc = () => {
    const {
        push,
        pathname,
        query,
        query: { average },
    } = useRouter();

    const sortByAverage = useCallback(() => {
        push({
            pathname,
            query: { ...query, page: 1, average: average ? (average === 'asc' ? 'desc' : 'asc') : 'asc' },
        });
    }, [query]);

    return { sortByAverage };
};
