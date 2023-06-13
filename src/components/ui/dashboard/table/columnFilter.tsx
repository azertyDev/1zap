import { ChangeEvent } from 'react';
import s from './index.module.scss';
import { Icon } from 'components/ui/icon';
import { useTranslation } from 'next-i18next';

export const ColumnFilter = ({ column: { filterValue, setFilter } }: any) => {
    const { t } = useTranslation();
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = e;
        setFilter(value);
    };

    return (
        <div className={s.input_search_wr}>
            <div className={s.input_search_icon}>
                <Icon name={'search'} size={16} color={'#9A9EA7'} />
            </div>

            <input
                type="text"
                name="filter"
                value={filterValue || ''}
                onChange={handleChange}
                className={s.filterInput}
                placeholder={t('dashboard:for_search') as string}
            />
        </div>
    );
};
