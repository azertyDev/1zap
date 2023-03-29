import { i18n } from 'next-i18next';

export const transformSelectOptions = (options: { label: string; value: string }[]) => {
    return options.map(({ label, value }) => {
        return { label: i18n!.t(`common:selects.${label}`), value };
    });
};
