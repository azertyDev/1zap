import { FC, useCallback, useMemo, useState } from 'react';
import s from './index.module.scss';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import { Icon } from 'components/ui/icon';
import { useTranslation } from 'next-i18next';

import { IconsWrapper } from 'components/ui/icons_wrapper';

export const FilterCalendar: FC<{ showCalendar?: boolean }> = ({ showCalendar = true }) => {
    const { t } = useTranslation();
    const [value, setValue] = useState<null | string>(null);
    const [isOpen, setIsOpen] = useState(false);

    const [month, setMonth] = useState(new Date());

    const handleMonth = (type: string) => {
        return () => {
            if (type === 'plus') {
                setMonth((prev) => {
                    const formDate = new Date(prev);
                    return new Date(formDate.setMonth(formDate.getMonth() + 1));
                });
            }
            if (type === 'minus') {
                setMonth((prev) => {
                    const formDate = new Date(prev);
                    return new Date(formDate.setMonth(formDate.getMonth() - 1));
                });
            }
        };
    };

    const options = useMemo(
        () => ({
            year: 'numeric',
            month: 'long',
        }),
        []
    );

    const handleChange = useCallback((e: string) => {
        setValue(e);
    }, []);

    const handleCalendar = useCallback((val: boolean) => {
        return () => setIsOpen(val);
    }, []);

    console.log(month);

    return (
        <div className={s.filter_calendar}>
            <div className={s.calendar_btns_wr}>
                <div className={s.btn_control_month}>
                    <IconsWrapper onClick={handleMonth('minus')}>
                        <Icon name={'chevron_left'} />
                    </IconsWrapper>
                </div>
                <IconsWrapper onClick={handleMonth('plus')}>
                    <Icon name={'chevron_right'} />
                </IconsWrapper>
                <h5 className={s.month_calendar}>{month.toLocaleString('ru-Ru', options as any)}</h5>
            </div>
            {showCalendar && (
                <label className={s.calendar_btn_lable}>
                    <button onClick={handleCalendar(true)} className={s.calendar_btn}>
                        <Icon name={'event'} color={'#9A9EA7'} size={18} />
                        <span>{t('dashboard:calendar')}</span>
                    </button>
                    <DatePicker
                        calendarClassName={'calendar'}
                        onChange={handleChange as any}
                        value={value}
                        isOpen={isOpen}
                        onCalendarClose={handleCalendar(false)}
                    />
                </label>
            )}
        </div>
    );
};
