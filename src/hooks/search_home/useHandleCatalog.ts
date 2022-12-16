import { useCallback, useState } from 'react';

export const useHandleCatalog = () => {
    const [activeCat, setActive] = useState(1);

    const handleActiveCatalog = useCallback((val: number) => {
        return () => setActive(val);
    }, []);

    return { activeCat, handleActiveCatalog };
};
