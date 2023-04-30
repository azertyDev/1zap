import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';

export const useFiltersAscDesc = () => {
    const { pathname, push, query } = useRouter();
    const [nameFilter, setNameFilter] = useState('asc');

    const handleAscDesc = useCallback((val: string) => () => 1, []);
    const sortData = (data: any, condition: string, param: string) => {};
    return { handleAscDesc, sortData };
};
