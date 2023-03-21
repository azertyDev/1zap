import { FilterSelections } from 'components/ui/filter/filter_selections';
import { FilterSelect } from 'components/ui/filter/filter_selections/filter_select';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

import { useRouter } from 'next/router';
import { useGetFitCar } from 'src/hooks/laximoData/useGetFitCar';
import { useFilter } from 'src/hooks/common/useFilter';

const parseString = require('xml2js').parseString;

export const FitCars: FC<{ dataCatalog: string; dataWizard: string }> = ({ dataCatalog, dataWizard }) => {
    const { t } = useTranslation();
    const { catalog } = useGetFitCar(dataCatalog);
    const {
        query: { brand, model, year, region, ssd, page },
        push,
        pathname,
        query,
    } = useRouter();

    const [a, setA] = useState(null);
    useEffect(() => {
        if (dataWizard) {
            parseString(dataWizard, function (err: string, result: any) {
                setA(result.response.GetWizard2[0].row);
            });
        }
    }, [brand]);

    console.log(a);

    const { handleFilter } = useFilter();

    const handleFilterBrand = () => {
        return (ev: any) => {
            push({
                pathname: pathname,
                query: {
                    page: page ?? 1,
                    brand: ev.value,
                },
            });
        };
    };

    return (
        <FilterSelections>
            {catalog && (
                <FilterSelect
                    id={'brand'}
                    title={t('filter:brand')}
                    value={(brand ?? '') as string}
                    fun={handleFilterBrand}
                    labelAlt={''}
                    options={catalog}
                />
            )}

            <FilterSelect
                id={'ssd'}
                title={t('filter:model')}
                value={(ssd ?? 'a') as string}
                fun={handleFilter}
                labelAlt={'a'}
                options={[
                    { value: 'a', label: 'a' },
                    { value: 'b', label: 'b' },
                ]}
            />

            <FilterSelect
                id={'ssd'}
                title={t('filter:year')}
                value={(ssd ?? 'a') as string}
                fun={handleFilter}
                labelAlt={'a'}
                options={[
                    { value: 'a', label: 'a' },
                    { value: 'b', label: 'b' },
                ]}
            />

            <FilterSelect
                id={'ssd'}
                title={t('filter:region')}
                value={(ssd ?? 'a') as string}
                fun={handleFilter}
                labelAlt={'a'}
                options={[
                    { value: 'a', label: 'a' },
                    { value: 'b', label: 'b' },
                ]}
            />
        </FilterSelections>
    );
};
