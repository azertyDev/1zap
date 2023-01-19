import { useCallback, useState } from 'react';

export const useHandleActiveLink = () => {
    const [active, setActive] = useState(false);

    const handleAtiveFooterLink = useCallback(() => {
        setActive((prev) => !prev);
    }, []);

    return { active, handleAtiveFooterLink };
};
