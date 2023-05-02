import { useCallback, useEffect, useState } from 'react';
import { IProductGroup } from 'types';

export const useFiltersAscDesc = (data: { data: IProductGroup[]; totalPages: number }) => {
    const [dataOut, setDataOut] = useState(data);
    useEffect(() => {
        setDataOut(data);
    }, [data]);

    const handleAsc = useCallback(
        (param: 'sum' | 'usd') => {
            return () => {
                setDataOut({
                    data: [...(data?.data as any)].sort(
                        (a: IProductGroup, b: IProductGroup) => a[param].average - b[param].average
                    ),
                    totalPages: data?.totalPages!,
                });
            };
        },
        [data]
    );

    const handleDesc = useCallback(
        (param: 'sum' | 'usd') => {
            return () => {
                setDataOut({
                    data: [...(data?.data as any)].sort(
                        (a: IProductGroup, b: IProductGroup) => b[param].average - a[param].average
                    ),
                    totalPages: data?.totalPages!,
                });
            };
        },
        [data]
    );

    return { dataOut, handleDesc, handleAsc };
};
