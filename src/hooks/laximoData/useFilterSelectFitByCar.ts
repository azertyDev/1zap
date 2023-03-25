import { Dispatch, useEffect } from 'react';

const parseString = require('xml2js').parseString;

const setProperty = (
    condition: { options: { row: { $: { key: string; value: string } }[] }[] }[],
    clb: Dispatch<any>
) => {
    if (condition.length > 0) {
        const optionsModel = condition[0].options[0].row;
        const formOptionsForSelect = optionsModel.map((item) => {
            return { value: item.$.key, label: item.$.value };
        });
        clb(formOptionsForSelect);
    } else {
        clb(null);
    }
};

export const useFilterSelectFitByCar = (data: string, clb: Dispatch<any>, condition: any, dep: string[]) => {
    useEffect(() => {
        if (data) {
            parseString(data, function (err: string, result: any) {
                const temp = result.response.GetWizard2[0].row?.filter((item: { $: { name: string } }) => {
                    return condition(item);
                });

                setProperty(temp, clb);
            });
        } else {
            clb(null);
        }
    }, [...dep]);
};
