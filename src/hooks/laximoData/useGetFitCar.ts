import { useEffect, useState } from 'react';
const parseString = require('xml2js').parseString;

export const useGetFitCar = (dataFind: string) => {
    const [catalog, setCatalog] = useState<{ value: string; label: string }[] | null>(null);

    useEffect(() => {
        if (dataFind) {
            parseString(dataFind, function (err: string, result: any) {
                const tempCat: { $: { name: string; code: string } }[] = result.response.ListCatalogs[0].row;
                const res = tempCat.map((item) => {
                    return { value: item.$.code, label: item.$.name };
                });

                setCatalog(res);
            });
        }
    }, []);

    return { catalog };
};
