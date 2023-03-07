import { useEffect, useState } from 'react';
import { axiosInstance } from 'src/utils/axios';

export const useFilterTabs = (catalogNumber: number) => {
    const [filterData, setFilterData] = useState<{
        [val: string]: { value: string; label: string }[];
    } | null>(null);

    useEffect(() => {
        (async () => {
            const { data } = await axiosInstance(`/catalog/${catalogNumber}`);
            setFilterData(data?.category);
        })();
    }, []);

    return { filterData };
};
