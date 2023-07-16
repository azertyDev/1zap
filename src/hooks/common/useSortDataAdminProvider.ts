import { useState } from 'react';

export const useSortDataAdminProvider = () => {
    const [sortType, setSortType] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState('');

    const handleSortProducts = (type: string, by: string, typeAnother?: string) => {
        return () => {
            setSortType(typeAnother ?? type);
            setSortBy(by);
        };
    };

    return { sortBy, sortType, handleSortProducts };
};
