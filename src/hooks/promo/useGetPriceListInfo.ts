import { useEffect, useState } from 'react';
import { productsApi } from 'src/utils/api';
import { toast } from 'react-hot-toast';
import { FormikValues } from 'formik';
import { useTranslation } from 'next-i18next';

export const useGetPriceListInfo = (formik: FormikValues, dep: any) => {
    const [listInfo, setListInfo] = useState({ total: 0, textRu: null, textUz: null, hasReclam: false });
    const { t } = useTranslation();

    useEffect(() => {
        if (formik.values.pricelistId) {
            (async () => {
                productsApi
                    .getListInfo(formik.values.pricelistId as number)
                    .then((res) => {
                        setListInfo(res);
                    })
                    .catch(() => {
                        toast.error(t('helpers:error_getting'));
                    });
            })();
        }
    }, [dep]);

    return { listInfo };
};
