import { ChangeEvent, Dispatch, FC, useEffect, useState } from 'react';
import s from './index.module.scss';
import { Icon } from 'components/ui/icon';
import { useTranslation } from 'next-i18next';

export const ColumnFilter: FC<{ setSearch: Dispatch<any> }> = ({ setSearch }) => {
    const { t } = useTranslation();
    const [val, setVal] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = e;
        setVal(value);
    };

    useEffect(() => {
        const timer = setTimeout(async () => {
            setSearch(val);
        }, 800);
        return () => {
            clearTimeout(timer);
        };
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
