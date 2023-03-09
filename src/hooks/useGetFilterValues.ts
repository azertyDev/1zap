import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';

export const useGetFilterValues = () => {
    const { t } = useTranslation();

    const searchValue: { [val: string]: { value: string; label: string }[] } =
        useMemo(
            () => ({
                payment: [
                    {
                        value: 'cash',
                        label: t('filter:cash'),
                    },
                    {
                        value: 'card',
                        label: t('filter:card'),
                    },
                    {
                        value: 'transfer',
                        label: t('filter:transfer'),
                    },
                ],
                delivery: [
                    {
                        value: 'pickup',
                        label: t('filter:pickup'),
                    },
                    {
                        value: 'courier',
                        label: t('filter:courier'),
                    },
                ],
                service: [
                    {
                        value: 'tireFitting',
                        label: t('filter:tireFitting'),
                    },
                    {
                        value: 'autoService',
                        label: t('filter:autoService'),
                    },
                    {
                        value: 'partSelection',
                        label: t('filter:partSelection'),
                    },
                ],
                clientType: [
                    {
                        value: 'legal',
                        label: t('filter:legal'),
                    },
                    {
                        value: 'individual',
                        label: t('filter:individual'),
                    },
                ],
            }),
            []
        );

    return { searchValue };
};
