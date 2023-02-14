import {FilterSelections} from "components/ui/filter/filter_selections";
import {FilterSelect} from "components/ui/filter/filter_selections/filter_select";
import React from "react";
import {useTranslation} from "next-i18next";

import {useRouter} from "next/router";

import {useFilter} from "src/hooks/common/useFilter";

export const FirCars = () => {
    const {t} = useTranslation();

    const {handleFilter} = useFilter();

    const {
        query: {
            brand,
            model,
            year,
            modification,
        },
    } = useRouter();


    return <FilterSelections>
        <FilterSelect
            id={'brand'}
            title={t('filter:brand')}
            value={
                (brand ??
                    'Aaaaaaaaaaaaaaaaaaaa') as string
            }
            fun={handleFilter}
            labelAlt={'Aaaaaaaaaaaaaaaaaaaa'}
            options={[
                {
                    value: 'Aaaaaaaaaaaaaaaaaaaa',
                    label: 'Aaaaaaaaaaaaaaaaaaaa',
                },
                {value: 'b', label: 'b'},
            ]}
        />
        <FilterSelect
            id={'model'}
            title={t('filter:model')}
            value={(model ?? 'a') as string}
            fun={handleFilter}
            labelAlt={'a'}
            options={[
                {value: 'a', label: 'a'},
                {value: 'b', label: 'b'},
            ]}
        />
        <FilterSelect
            id={'year'}
            title={t('filter:year')}
            value={(year ?? 'a') as string}
            fun={handleFilter}
            labelAlt={'a'}
            options={[
                {value: 'a', label: 'a'},
                {value: 'b', label: 'b'},
            ]}
        />

        <FilterSelect
            id={'modification'}
            title={t('filter:modification')}
            value={(modification ?? 'a') as string}
            fun={handleFilter}
            labelAlt={'a'}
            options={[
                {value: 'a', label: 'a'},
                {value: 'b', label: 'b'},
            ]}
        />
    </FilterSelections>
}