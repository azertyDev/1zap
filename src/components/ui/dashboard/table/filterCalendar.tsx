import { ChangeEvent, useState } from 'react';
import s from './index.module.scss';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
export const FilterCalendar = ({ column: { filterValue, setFilter } }: any) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = e;
        setFilter(value);
    };

    const [value, onChange] = useState(new Date());

    return (
        <div className={s.filter_calendar}>
            <DatePicker calendarClassName={'calendar'} onChange={onChange as any} value={value} />
        </div>
    );
};
