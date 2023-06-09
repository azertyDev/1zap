import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useFormik } from 'formik';
import { branchApi, promoApi } from 'src/utils/api';
import { toast } from 'react-hot-toast';

interface IOptions {
    label: string;
    value: number | undefined;
}

export const useGetBranchesAndPriceLists = (sendBranch: boolean = true, sentList: boolean = true) => {
    const [branches, setBranches] = useState<IOptions[] | null>(null);
    const [lists, setLists] = useState<IOptions[] | null>(null);
    const { t } = useTranslation();

    const formikBranches = useFormik({
        onSubmit: () => false as any,
        enableReinitialize: true,
        initialValues: {
            branchId: branches ? branches[0].value : null,
        },
    });

    const formikPrice = useFormik({
        onSubmit: () => false as any,
        enableReinitialize: true,
        initialValues: {
            pricelistId: lists && lists.length > 0 ? lists[0].value : null,
        },
    });

    useEffect(() => {
        if (sendBranch) {
            (async () => {
                branchApi
                    .getAllBranches()
                    .then((res) => {
                        const val = res.map((item: { id: number; branchName: string }) => ({
                            value: item.id,
                            label: item.branchName,
                        }));
                        setBranches(val);
                    })
                    .catch(() => {
                        toast.error(t('helpers:error_getting'));
                    });
            })();
        }
    }, []);
    useEffect(() => {
        if (sentList) {
            (async () => {
                if (formikBranches.values.branchId) {
                    promoApi
                        .getPriceListByBranch(formikBranches.values.branchId as number)
                        .then((res) => {
                            if (res.length === 0) {
                                toast.error(t('dashboard:no_price_list'));
                            }

                            const val = res.map((subitem: { id: number; title: string }) => ({
                                value: subitem.id,
                                label: subitem.title,
                            }));

                            setLists(val);
                        })
                        .catch(() => {
                            toast.error(t('helpers:error_getting'));
                        });
                }
            })();
        }
    }, [formikBranches.values.branchId]);

    return { formikBranches, formikPrice, branches, lists };
};
