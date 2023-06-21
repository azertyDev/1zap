import { useEffect, useState } from 'react';
import { axiosInstance } from 'src/utils/axios';
import { useTranslation } from 'next-i18next';

export const useFilterTabs = (catalogNumber: number) => {
    const { t } = useTranslation();
    const [filterData, setFilterData] = useState<{
        [val: string]: { value: string; label: string }[];
    } | null>(null);

    useEffect(() => {
        (async () => {
            const { data } = await axiosInstance(`/catalog/${catalogNumber}`);
            if (data && data?.category) {
                const temp = data?.category;

                for (const key in temp) {
                    temp[key].unshift({ value: '', label: t('common:selects.all') });
                }
                console.log(data?.category);
                setFilterData(temp);
            }
        })();
    }, []);

    console.log(filterData);
    return { filterData };
};
