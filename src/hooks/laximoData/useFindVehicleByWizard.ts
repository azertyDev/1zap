import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const parseString = require('xml2js').parseString;

export const useFindVehicleByWizard = (data: string) => {
    const [dataVehicle, setDataVehicle] = useState<
        | {
              $: { brand: string; name: string; catalog: string; ssd: string; vehicleid: string };
              attribute: { $: { key: string; value: string } }[];
          }[]
        | null
    >(null);

    const {
        query: { model, region, year, brand },
    } = useRouter();
    useEffect(() => {
        if (data) {
            parseString(data, function (err: string, result: any) {
                setDataVehicle(result.response.FindVehicleByWizard2[0].row);
            });
        } else {
            setDataVehicle(null);
        }
    }, [model, region, year, brand]);

    return { dataVehicle };
};
