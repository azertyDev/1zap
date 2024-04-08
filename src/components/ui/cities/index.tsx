import { FC, useEffect, useState } from 'react';
import Link from 'next/link';

import { useRouter } from 'next/router';
import s from './index.module.scss';

import { useHandleLang } from 'src/hooks/header/useHandleLang';
import { Icon } from 'components/ui/icon';
import { useTranslation } from 'next-i18next';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import { SelectField } from '../select';
import { transformSelectOptions } from 'src/helpers/transformSelectOptions';
import { FilterSelect } from '../filter/filter_selections/filter_select';
import { useFilter } from 'src/hooks/common/useFilter';
import { SimpleSelectField } from '../simple_select';


export const Cities: FC = (): JSX.Element => {
    const {query:{city}, asPath, pathname, query, locale ,push} = useRouter();
    const { t } = useTranslation();


    const [cities,setCities] = useState([
        { value: "all_cities", label:"all_cities" },
        { value: "tashkent", label:"tashkent"},
        { value: "bukhara", label: "bukhara" },
        { value: "samarkand", label: "samarkand" },
        { value: "andijan", label: "andijan" },
        { value: "namangan", label: "namangan" },
        { value: "jizak", label: "jizak" },
        { value: "nukus", label: "nukus" },
        { value: "karshi", label: "karshi" },
        { value: "navoi", label: "navoi" },
        { value: "termez", label: "termez" },
        { value: "gulistan", label: "gulistan" },
        { value: "fergana", label: "fergana" },
        { value: "urgench", label: "urgench" },
    ]) 


    const formik = useFormik({
        initialValues: {c:cities[0]},
        onSubmit: async (values) => {},
    });




    return (
        <div className={s.city_wr}>
            <div className={s.img}>
                <Icon size={18} name={'pin_drop'} />
            </div>
            
            <FormikProvider value={formik}>
                   <Form className={s.form}>
                   <Field
                                component={SimpleSelectField}
                                name="service"
                                value={city?t(`common:selects.${city}`): t(`common:selects.all_cities`)}
                                options={transformSelectOptions(cities)}
                            />
                   </Form>
                   </FormikProvider>
                
        </div>
    );
};
