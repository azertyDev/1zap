import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

export const useFilterRespons = (fun: (val: boolean) => () => void) => {
    const {
        push,
        pathname,
        query,
        query: { page },
    } = useRouter();

    const [filterVal, setFilterVal] = useState(query ?? {});

    const handleFilter = useCallback((val: { [val: string]: string }) => {
        return () => {
            setFilterVal((prev) => ({ ...prev, ...val }));
        };
    }, []);

    const handleSubmitFilter = useCallback(() => {
        fun(false)();
        push({
            pathname: pathname,
            query: {
                page: 1,
                ...filterVal,
            },
        });
    }, [filterVal]);

    return { filterVal, handleFilter, handleSubmitFilter };
};
