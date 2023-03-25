import { useCallback } from 'react';
import { useRouter } from 'next/router';

export const useFilterDetails = () => {
    const {
        query: { brand, brandLabel, regionLabel },
        push,
        pathname,
        query,
    } = useRouter();

    const handleFilterBrand = useCallback(() => {
        return (ev: any) => {
            push({
                pathname: pathname,
                query: {
                    tab: 2,
                    brand: ev.value,
                    brandLabel: ev.label,
                },
            });
        };
    }, []);

    const handleFilterFirstLevel = useCallback(
        (val: string, valLabel: string) => () => (ev: any) => {
            push({
                pathname: pathname,
                query: {
                    tab: 2,
                    brand: brand,
                    brandLabel: brandLabel,
                    [val]: ev.value,
                    [valLabel]: ev.label,
                },
            });
        },
        [brandLabel]
    );

    const handleFilterYear = useCallback(
        () => (ev: any) => {
            push({
                pathname: pathname,
                query: {
                    ...query,
                    year: ev.value,
                    yearLabel: ev.label,
                },
            });
        },
        [brandLabel, regionLabel]
    );

    return { handleFilterBrand, handleFilterFirstLevel, handleFilterYear };
};
