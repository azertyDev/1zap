import { FC, useCallback, useEffect, useState } from 'react';
import s from './index.module.scss';

import { useTranslation } from 'next-i18next';
import { useFormik, FormikProvider, Form } from 'formik';

import { Icon } from 'components/ui/icon';
import { client_validation } from 'src/validation/client_validation';
import { useRouter } from 'next/router';
import { productsApi } from 'src/utils/api';
import { toast } from 'react-hot-toast';

import Link from 'next/link';
import { IProduct } from 'types';

export const SearchDetails: FC<{ className: string }> = ({ className }): JSX.Element => {
    const { t } = useTranslation();
    const { push, locale } = useRouter();
    const [data, setData] = useState<IProduct[] | null>(null);

    const formik = useFormik({
        initialValues: {
            searchVal: '',
        },
        validationSchema: client_validation.search,
        onSubmit: (values) => {
            push(`/search_result?filter=${values.searchVal}&client=individual`);
        },
    });

    useEffect(() => {
        if (formik.values.searchVal.length > 0) {
            const timer = setTimeout(async () => {
                await productsApi
                    // @ts-ignore
                    .getProductsNoGroup(`page=1&lang=${locale}&filter=${formik.values.searchVal}`)
                    .then((res) => setData(res?.data?.slice(0, 4)))
                    .catch(() => toast.error(t('helpers:error_getting')));
            }, 700);
            return () => {
                clearTimeout(timer);
            };
        } else setData(null);
    }, [formik.values.searchVal]);

    const handlePush = useCallback(() => {
        push(`/search_result?filter=${formik.values.searchVal}`);
    }, [formik.values.searchVal]);

    return (
        <>
            <div className={`${s.input_wr} ${className}`}>
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

                {data && (
                    <div className={s.debounce}>
                        <div className={s.debounce_line}></div>
                        {data.length === 0 && <p className={s.nothing_found}>{t('home:nothing_found')}</p>}
                        {data.length > 0 &&
                            data.map((item) => {
                                return (
                                    <div className={s.debounce_item} key={item.id}>
                                        <p className={s.debounce_item_title}>{item.uniqNumber}</p>
                                        <p className={s.debounce_item_text}>{item.description}</p>
                                        <Link
                                            className={s.debounce_item_link}
                                            href={`/search_result?oem=${item.uniqNumber}`}
                                        ></Link>
                                    </div>
                                );
                            })}
                        {data.length > 0 && (
                            <div className={s.debounce_show_all} onClick={handlePush}>
                                <p>{t('home:show_all')}</p>
                                <Icon name={'chevron_right'} size={20} color={'#fff'} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};
