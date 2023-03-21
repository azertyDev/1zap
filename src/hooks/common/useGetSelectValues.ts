import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';

export const useGetSelectValues = () => {
    const { t } = useTranslation();

    const value = useMemo(
        () => ({
            city: [
                {
                    value: 'tashkent',
                    label: t('select:tashkent'),
                },
                {
                    value: 'bukhara',
                    label: t('select:bukhara'),
                },
                {
                    value: 'samarkand',
                    label: t('select:samarkand'),
                },
                {
                    value: 'andijan',
                    label: t('select:andijan'),
                },
                {
                    value: 'namangan',
                    label: t('select:namangan'),
                },
            ],
            service: [
                {
                    value: 'tireFitting',
                    label: t('select:tireFitting'),
                },
                {
                    value: 'autoService',
                    label: t('select:autoService'),
                },
                {
                    value: 'partSelection',
                    label: t('select:partSelection'),
                },
            ],
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
        }),
        []
    );

    return value;
};
