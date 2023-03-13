import { ChangeEvent } from 'react';
import s from './index.module.scss';

export const ColumnFilter = ({ column: { filterValue, setFilter } }: any) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = e;
        setFilter(value);
    };

    return (
        <input
            type="text"
            name="filter"
            value={filterValue || ''}
            onChange={handleChange}
            className={s.filterInput}
            placeholder="Введите для поиска ..."
        />
    );
};
