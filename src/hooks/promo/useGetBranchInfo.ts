import { useEffect, useState } from 'react';
import { productsApi } from 'src/utils/api';
import { toast } from 'react-hot-toast';
import { FormikValues } from 'formik';
import { useTranslation } from 'next-i18next';

export const useGetBranchInfo = (formik: FormikValues, dep: any) => {
    const [branchInfo, setBranchInfo] = useState({ total: 0, textRu: null, textUz: null, hasReclam: false });
    const { t } = useTranslation();

    useEffect(() => {
        if (formik.values.branchId) {
            (async () => {
                productsApi
                    .getBranchInfo(formik.values.branchId as number)
                    .then((res) => {
                        setBranchInfo(res);
                    })
                    .catch(() => {
                        toast.error(t('helpers:error_getting'));
                    });
            })();
        }
    }, [dep]);

    return { branchInfo };
};
