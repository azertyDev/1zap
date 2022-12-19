import { useCallback, useState } from 'react';

export const useHandleActivetTabHome = () => {
    const [activeTab, setActiveTab] = useState(1);
    const handleActivetab = useCallback((val: number) => {
        return () => setActiveTab(val);
    }, []);

    return { activeTab, handleActivetab };
};