import { FC } from 'react';

import s from './index.module.scss';

const footerLinksFirst = [
    {
        id: 1,
        title: 'aboutUs',
        links: ['howItWork', 'job', 'aboutUs', 'contacts'],
    },
];

const footerLinksSec = [
    {
        id: 2,
        title: 'mainCateg',
        links: ['oil', 'batteries', 'tires', ''],
    },
    {
        id: 3,
        title: 'mainCateg',
        links: ['searchVin', 'sparePartsCat', 'oil', 'batteries', 'tires', ''],
    },
];

const footerLinksThird = [
    {
        id: 3,
        title: 'mainCateg',
        links: ['searchVin', 'sparePartsCat', 'oil', 'batteries', 'tires', ''],
    },
];

const footerLinksFourth = [
    {
        id: 3,
        title: 'mainCateg',
        links: ['searchVin', 'sparePartsCat', 'oil'],
    },
];

export const Footer: FC = (): JSX.Element => {
    return (
        <div className={s.footer}>
            <div className={s.footer_top}></div>
            <div className={s.footer_bot}></div>
        </div>
    );
};
