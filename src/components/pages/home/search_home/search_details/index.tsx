import { FC } from 'react';
import s from './index.module.scss';

import { useTranslation } from 'next-i18next';
import { useFormik, FormikProvider, Form } from 'formik';

import { Icon } from 'components/ui/icon';
import { client_validation } from 'src/validation/client_validation';
import { useRouter } from 'next/router';

export const SearchDetails: FC<{ className: string }> = ({ className }): JSX.Element => {
    const { t } = useTranslation();
    const { push } = useRouter();

    const formik = useFormik({
        initialValues: {
            searchVal: '',
        },
        validationSchema: client_validation.search,
        onSubmit: (values) => {
            push(`/search_result?filter=${values.searchVal}`);
        },
    });

    return (
        <>
            <div className={className}>
                <FormikProvider value={formik}>
                    <Form>
                        <button type="submit" className={s.big_search_img}>
                            <Icon size={30} name={'search'} color={'#fff'} />
                        </button>

                        <input {...formik.getFieldProps('searchVal')} type="text" placeholder={t('home:searchOem')!} />
                        <div className={s.search_icon_res}>
                            <Icon size={24} name={'search'} color={'#C6303C'} />
                        </div>

                        <button type="submit" className={s.btn}>
                            <Icon size={18} name={'search'} color={'#323232'} />
                            <span>{t('common:search')}</span>
                        </button>
                    </Form>
                </FormikProvider>
            </div>
        </>
    );
};
