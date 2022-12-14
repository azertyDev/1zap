import { useCallback, useEffect, useState } from 'react';

export const useHandleRate = () => {
    const [rate, setRate] = useState('uzs');

    const handleRate = useCallback((val: string) => {
        return () => {
            localStorage.setItem('rate', val);
            setRate(val);
        };
    }, []);

    useEffect(() => {
        const locRate = localStorage.getItem('rate');
        setRate(locRate ? locRate : 'uzs');
    }, []);

    return { handleRate, rate };
};
