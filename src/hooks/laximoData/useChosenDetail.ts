import { useEffect, useState } from 'react';
import { unitDetailInfoInt } from 'src/interfaces/laximoDataInt';

const parseString = require('xml2js').parseString;

export const useChosenDetail = (dataAuto: string, dataDetailByUnit: string, dataGetUnitInfo: string) => {
    const [auto, setAuto] = useState<{ brand: string; name: string } | null>(null);
    const [detailByUnit, setDetailByUnit] = useState<
        | {
              $: {
                  codeonimage: string;
                  name: string;
                  oem: string;
              };
          }[]
        | null
    >(null);
    const [unitInfo, setUnitInfo] = useState<unitDetailInfoInt | null>(null);

    useEffect(() => {
        if (dataAuto) {
            parseString(dataAuto, function (err: string, result: any) {
                setAuto(result.response.GetVehicleInfo[0].row[0].$);
            });
        }
        if (dataDetailByUnit) {
            parseString(dataDetailByUnit, function (err: string, result: any) {
                setDetailByUnit(result.response.ListDetailsByUnit[0].row);
            });
        }

        if (dataGetUnitInfo) {
            parseString(dataGetUnitInfo, function (err: string, result: any) {
                setUnitInfo(result.response.GetUnitInfo[0].row[0].$);
            });
        }
    }, []);

    return { auto, detailByUnit, unitInfo };
};
