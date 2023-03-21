import { useEffect, useState } from 'react';
import { unitDetailInfoInt } from 'src/interfaces/laximoDataInt';
const parseString = require('xml2js').parseString;
export const useDetailChosenCateg = (dataAuto: string, dataList: string) => {
    const [auto, setAuto] = useState<{ brand: string; name: string } | null>(null);
    const [list, setList] = useState<
        | {
              $: { name: string };
              Unit: {
                  $: unitDetailInfoInt;
              }[];
          }[]
        | null
    >(null);

    useEffect(() => {
        if (dataList) {
            parseString(dataList, function (err: string, result: any) {
                setList(result.response.ListQuickDetail[0].Category);
            });
        }
        if (dataAuto) {
            parseString(dataAuto, function (err: string, result: any) {
                setAuto(result.response.GetVehicleInfo[0].row[0].$);
            });
        }
    }, []);
    return { auto, list };
};
