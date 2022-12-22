import { useEffect, useState } from 'react';

export const usePreviewSearchResult = (dep: string, formik: any) => {
    const [searchRes, setSearchRes] = useState(false);
    useEffect(() => {
        formik.values.searchVal.length > 0
            ? setSearchRes(true)
            : setSearchRes(false);
    }, [dep]);

    return { searchRes };
};
