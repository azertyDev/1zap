import { useCallback, useState } from 'react';

export const useStepOrder = () => {
    const [order, setOrder] = useState(1);

    const handleOrder = useCallback((val: number) => {
        return () => setOrder(val);
    }, []);

    return { order, handleOrder };
};
