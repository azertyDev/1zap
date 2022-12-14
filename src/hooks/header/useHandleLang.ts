import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';

export const useHandleLang = () => {
    const { locale } = useRouter();
    const [switchLang, setSwitchLang] = useState(locale);

    const handlelang = useCallback((val: string) => {
        return () => setSwitchLang(val);
    }, []);

    return { handlelang };
};
