import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const useHandleRate = () => {
    const {
        pathname,
        query,
        push,
        query: { rate },
    } = useRouter();

    const handleRate = useCallback((val: string) => {
        return () => push({ pathname, query: { ...query, rate: val } });
    }, []);

    return { handleRate };
};
