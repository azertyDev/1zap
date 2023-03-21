import { useEffect, useState } from 'react';
import { listCategoriesFormedInt, listCategoriesInt } from 'src/interfaces/laximoDataInt';

const parseString = require('xml2js').parseString;

const formListRecursion = (val: listCategoriesInt, arr: { link: string; name: string; quickgroupid: string }[]) => {
    if (val.row) {
        for (const key of val.row) {
            arr.push(key.$);
            if (key.row) {
                formListRecursion(key as any, arr);
            }
        }
    }
};

const formedList = (val: listCategoriesInt[]) => {
    const titles = [];
    const rows = [];

    for (const item of val) {
        titles.push(item.$.name);
        rows.push(item.row);
    }

    const filteredRows = rows.map((item) => {
        return item.map((item) => {
            const temp = [];
            temp.push(item.$);
            formListRecursion(item as any, temp);
            return temp;
        });
    });

    return { titles, filteredRows };
};

export const useDetailCategories = (dataAuto: string, dataList: string) => {
    const [list, setList] = useState<listCategoriesFormedInt | null>(null);

    const [auto, setAuto] = useState<{ brand: string; name: string } | null>(null);

    useEffect(() => {
        if (dataList) {
            parseString(dataList, function (err: string, result: any) {
                const list = formedList(result.response.ListQuickGroups[0].row[0].row);
                setList(list as listCategoriesFormedInt);
            });
        }
        if (dataAuto) {
            parseString(dataAuto, function (err: string, result: any) {
                setAuto(result.response.GetVehicleInfo[0].row[0].$);
            });
        }
    }, []);

    return { list, auto };
};
