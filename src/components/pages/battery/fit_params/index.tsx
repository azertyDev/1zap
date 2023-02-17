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
            polarity,
            capacity,
            electricity,
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
            id={'polarity'}
            title={t('filter:polarity')}
            value={(polarity ?? 'a') as string}
            fun={handleFilter}
            labelAlt={'a'}
            options={[
                {value: 'a', label: 'a'},
                {value: 'b', label: 'b'},
            ]}
        />
        <FilterSelect
            id={'capacity'}
            title={t('filter:capacity')}
            value={(capacity ?? 'a') as string}
            fun={handleFilter}
            labelAlt={'a'}
            options={[
                {value: 'a', label: 'a'},
                {value: 'b', label: 'b'},
            ]}
        />

        <FilterSelect
            id={'electricity'}
            title={t('filter:electricity')}
            value={(electricity ?? 'a') as string}
            fun={handleFilter}
            labelAlt={'a'}
            options={[
                {value: 'a', label: 'a'},
                {value: 'b', label: 'b'},
            ]}
        />

    </FilterSelections>

};
