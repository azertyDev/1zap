import React, {FC} from 'react';

import {useTranslation} from 'next-i18next';
import {useRouter} from "next/router";

import {FilterSelections} from "components/ui/filter/filter_selections";
import {FilterSelect} from "components/ui/filter/filter_selections/filter_select";
import {useFilter} from "src/hooks/common/useFilter";

export const FitParams: FC = (): JSX.Element => {
    const {t} = useTranslation();

    const {handleFilter} = useFilter();

    const {
        query: {
            producer,
            width,
            height,
            diameter,
            season
        },
    } = useRouter();


    return <FilterSelections>
        <FilterSelect
            id={'producer'}
            title={t('filter:producer')}
            value={
                (producer ??
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
            id={'width'}
            title={t('filter:width')}
            value={(width ?? 'a') as string}
            fun={handleFilter}
            labelAlt={'a'}
            options={[
                {value: 'a', label: 'a'},
                {value: 'b', label: 'b'},
            ]}
        />
        <FilterSelect
            id={'height'}
            title={t('filter:height')}
            value={(height ?? 'a') as string}
            fun={handleFilter}
            labelAlt={'a'}
            options={[
                {value: 'a', label: 'a'},
                {value: 'b', label: 'b'},
            ]}
        />

        <FilterSelect
            id={'diameter'}
            title={t('filter:diameter')}
            value={(diameter ?? 'a') as string}
            fun={handleFilter}
            labelAlt={'a'}
            options={[
                {value: 'a', label: 'a'},
                {value: 'b', label: 'b'},
            ]}
        />

        <FilterSelect
            id={'season'}
            title={t('filter:season')}
            value={(season ?? 'a') as string}
            fun={handleFilter}
            labelAlt={'a'}
            options={[
                {value: 'a', label: 'a'},
                {value: 'b', label: 'b'},
            ]}
        />
    </FilterSelections>

};
