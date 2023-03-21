import { useEffect, useState } from 'react';

const parseString = require('xml2js').parseString;

export const useFindVin = (dataFind: string) => {
    const [dataFindV, setDataFindV] = useState<
        | {
              $: { brand: string; name: string; catalog: string; ssd: string; vehicleid: string };
              attribute: { $: { key: string; value: string } }[];
          }[]
        | null
    >(null);

    useEffect(() => {
        if (dataFind) {
            parseString(dataFind, function (err: string, result: any) {
                setDataFindV(result.response.FindVehicle[0]['row'] ? [result.response.FindVehicle[0]['row'][0]] : null);
            });
        }
    }, [dataFind]);

    return { dataFindV };
};
