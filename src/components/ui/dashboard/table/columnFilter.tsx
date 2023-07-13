import { ChangeEvent, Dispatch, useEffect, useState } from 'react';
import s from './index.module.scss';
import { Icon } from 'components/ui/icon';
import { useTranslation } from 'next-i18next';
import { productsApi, promoApi } from 'src/utils/api';
import { toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import { client_validation } from 'src/validation/client_validation';
import { useRouter } from 'next/router';

export const ColumnFilter = ({ setData, idOut }: { setData: Dispatch<any>; idOut?: number }) => {
    const { t } = useTranslation();
    const [val, setVal] = useState('');
    const [isTouched, setISTouched] = useState(false);
    const {
        query: { page, id },
        locale,
    } = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = e;
        setVal(value);
        setISTouched(true);
    };

    useEffect(() => {
        if (isTouched) {
            const timer = setTimeout(async () => {
                (() => {
                    promoApi
                        .getProductsByPriceList((id ?? idOut) as number, locale as string, page as string, val)
                        .then((res) => setData(res))
                        .catch(() => toast.error(t('helpers:error_getting')));
                })();
            }, 1000);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [val]);

    return (
        <div className={s.input_search_wr}>
            <div className={s.input_search_icon}>
                <Icon name={'search'} size={16} color={'#9A9EA7'} />
            </div>

            <input
                type="text"
                name="filter"
                value={val}
                onChange={handleChange}
                className={s.filterInput}
                placeholder={t('dashboard:for_search') as string}
            />
        </div>
    );
};
