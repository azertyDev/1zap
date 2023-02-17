import {FilterSelections} from "components/ui/filter/filter_selections";
import {FilterSelect} from "components/ui/filter/filter_selections/filter_select";
import React, {useState} from "react";
import {useTranslation} from "next-i18next";

import {useRouter} from "next/router";
import {useFormik} from "formik";

export const FirCars = () => {
    const {t} = useTranslation();

    const {
        query: {
            brand,
            model,
            year,
            region,
        },
        push,
        pathname,
        query,
    } = useRouter();

    const formik = useFormik({
        initialValues: {
            searchVal: '',
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const handleFilter = (key: string) => {
        return (ev: any) => {
            push({
                pathname: pathname,
                query: {
                    ...query,
                    page: 1,
                    [key]: ev.value,
                },
            });
        };
    };
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
            id={'region'}
            title={t('filter:region')}
            value={(region ?? 'a') as string}
            fun={handleFilter}
            labelAlt={'a'}
            options={[
                {value: 'a', label: 'a'},
                {value: 'b', label: 'b'},
            ]}
        />
    </FilterSelections>
}