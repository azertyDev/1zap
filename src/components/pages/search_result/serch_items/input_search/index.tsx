import s from './index.module.scss';

import React, { FC, useCallback, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useFormik, FormikProvider, Form } from 'formik';
import { client_validation } from 'src/validation/client_validation';
import { useRouter } from 'next/router';
import { Icon } from 'components/ui/icon';

export const InputSearch: FC = (): JSX.Element => {
    const { t } = useTranslation();

    const {
        pathname,
        push,
        query: { filter, oem },
    } = useRouter();

    const formik = useFormik({
        initialValues: {
            searchVal: filter ?? oem,
        },
        validationSchema: client_validation.search,
        enableReinitialize: true,
        onSubmit: (values) => {
            push({
                pathname,
                query: {
                    filter: values.searchVal,
                    page: 1,
                },
            });
        },
    });

    return (
        <FormikProvider value={formik}>
            <Form className={s.input_wr}>
                <input {...formik.getFieldProps('searchVal')} type={'text'} placeholder={t('home:searchOem')!} />

                <button type="submit" className={s.btn_sub}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M2.74609 7.52734C3.40234 8.18359 4.19922 8.51172 5.13672 8.51172C6.07422 8.51172 6.87109 8.18359 7.52734 7.52734C8.18359 6.87109 8.51172 6.07422 8.51172 5.13672C8.51172 4.19922 8.18359 3.40234 7.52734 2.74609C6.87109 2.08984 6.07422 1.76172 5.13672 1.76172C4.19922 1.76172 3.40234 2.08984 2.74609 2.74609C2.08984 3.40234 1.76172 4.19922 1.76172 5.13672C1.76172 6.07422 2.08984 6.87109 2.74609 7.52734ZM9.63672 8.51172L13.3633 12.2383L12.2383 13.3633L8.51172 9.63672V9.03906L8.30078 8.82812C7.41016 9.60156 6.35547 9.98828 5.13672 9.98828C3.77734 9.98828 2.61719 9.51953 1.65625 8.58203C0.71875 7.64453 0.25 6.49609 0.25 5.13672C0.25 3.77734 0.71875 2.62891 1.65625 1.69141C2.61719 0.730469 3.77734 0.25 5.13672 0.25C6.49609 0.25 7.64453 0.730469 8.58203 1.69141C9.51953 2.62891 9.98828 3.77734 9.98828 5.13672C9.98828 5.62891 9.87109 6.19141 9.63672 6.82422C9.40234 7.43359 9.13281 7.92578 8.82812 8.30078L9.03906 8.51172H9.63672Z"
                            fill="#fff"
                        />
                    </svg>

                    <span>{t('common:search')} </span>
                </button>
            </Form>
        </FormikProvider>
    );
};
