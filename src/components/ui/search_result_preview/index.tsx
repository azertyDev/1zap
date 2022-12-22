import { FC } from 'react';
import s from './index.module.scss';

export const SearchResultPreview: FC<{ searchRes: boolean; data: any }> = ({
    searchRes,
    data,
}): JSX.Element => {
    return (
        <ul className={`${s.search_res} ${searchRes ? s.active : ''}`}>
            <li className={s.search_res_border}></li>
            {data.map((item: any) => {
                return (
                    <li key={item.id} className={s.search_res_item}>
                        <span className={s.search_res_title}>{item.title}</span>
                        <span className={s.search_res_text}>{item.text}</span>
                    </li>
                );
            })}
        </ul>
    );
};
