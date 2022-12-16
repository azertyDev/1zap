import { FC } from 'react';

import s from '../index.module.scss';
import { useTranslation } from 'next-i18next';
import { useHandleCatalog } from 'src/hooks/search_home/useHandleCatalog';

const fakeCatalog = [
    {
        id: 1,
        letter: 'A',
        data: [
            {
                id: 1,
                text: 'Accura',
            },
            {
                id: 2,
                text: 'Audi',
            },
        ],
    },
    {
        id: 2,
        letter: 'B',
        data: [
            {
                id: 1,
                text: 'BMW',
            },
        ],
    },
    {
        id: 3,
        letter: 'C',
        data: [
            {
                id: 1,
                text: 'CADILLAC',
            },
            {
                id: 2,
                text: 'CHEVROLET',
            },
            {
                id: 3,
                text: 'VOLKSWAGEN',
            },
            {
                id: 4,
                text: 'CITROEN',
            },
        ],
    },
    {
        id: 4,
        letter: 'D',
        data: [
            {
                id: 1,
                text: 'CADILLAC',
            },
            {
                id: 2,
                text: 'VOLKSWAGEN',
            },
            {
                id: 3,
                text: 'CHRYSLER',
            },
            {
                id: 4,
                text: 'CITROEN',
            },
        ],
    },
    {
        id: 5,
        letter: 'E',
        data: [
            {
                id: 1,
                text: 'CADILLAC',
            },
            {
                id: 2,
                text: 'VOLKSWAGEN',
            },
            {
                id: 3,
                text: 'CHRYSLER',
            },
            {
                id: 4,
                text: 'CITROEN',
            },
        ],
    },
    {
        id: 6,
        letter: 'F',
        data: [
            {
                id: 1,
                text: 'CADILLAC',
            },
            {
                id: 2,
                text: 'CHEVROLET',
            },
            {
                id: 3,
                text: 'CHRYSLER',
            },
            {
                id: 4,
                text: 'CITROEN',
            },
            {
                id: 5,
                text: 'CADILLAC',
            },
            {
                id: 6,
                text: 'CHEVROLET',
            },
            {
                id: 7,
                text: 'CHRYSLER',
            },
            {
                id: 8,
                text: 'VOLKSWAGEN',
            },
        ],
    },

    {
        id: 7,
        letter: 'G',
        data: [
            {
                id: 1,
                text: 'CADILLAC',
            },
        ],
    },

    {
        id: 8,
        letter: 'H',
        data: [
            {
                id: 1,
                text: 'CADILLAC',
            },
            {
                id: 1,
                text: 'CADILLAC',
            },
        ],
    },
    {
        id: 9,
        letter: 'I',
        data: [
            {
                id: 1,
                text: 'CADI dwqd wq dqw dwqdwqdwqdqw dwq dwLLAC dwq',
            },
            {
                id: 1,
                text: 'CADILLAC',
            },
            {
                id: 1,
                text: 'CADILLAC',
            },
        ],
    },
    {
        id: 1120,
        letter: 'J',
        data: [
            {
                id: 1,
                text: 'CADILLAC',
            },
            {
                id: 1,
                text: 'CADILLAC',
            },
            {
                id: 1,
                text: 'CADILLAC',
            },
            {
                id: 1,
                text: 'CADILLAC',
            },
        ],
    },
    {
        id: 10,
        letter: 'K',
        data: [
            {
                id: 1,
                text: 'CADILLAC dqw dwq dqwdwqdwq dwqd',
            },
            {
                id: 1,
                text: 'CADILLAC',
            },
            {
                id: 1,
                text: 'CADILLAC',
            },
            {
                id: 1,
                text: 'CADILLAC',
            },
        ],
    },
    {
        id: 11,
        letter: 'K',
        data: [
            {
                id: 1,
                text: 'CADILLAC',
            },
            {
                id: 1,
                text: 'CADILL dqwd wq dwq dwqAC dwq dwq',
            },
            {
                id: 1,
                text: 'CADILLAC',
            },
            {
                id: 1,
                text: 'CADILLAC',
            },
        ],
    },
    {
        id: 12,
        letter: 'K',
        data: [
            {
                id: 1,
                text: ' dqwd wq dwq dwqdwq dwqd',
            },
            {
                id: 1,
                text: 'CADILLAC',
            },
            {
                id: 1,
                text: 'CADILLAC',
            },
            {
                id: 1,
                text: 'CADILLAC',
            },
        ],
    },
];

export const SearchCatalog: FC = (): JSX.Element => {
    const { activeCat, handleActiveCatalog } = useHandleCatalog();

    const { t } = useTranslation();

    return (
        <div className={s.catalog}>
            <div>
                <p
                    onClick={handleActiveCatalog(1)}
                    className={`${s.cat_text} ${
                        activeCat === 1 ? s.active : ''
                    }`}
                >
                    {t('home:light')}{' '}
                </p>
                <p
                    onClick={handleActiveCatalog(2)}
                    className={`${s.cat_text} ${
                        activeCat === 2 ? s.active : ''
                    }`}
                >
                    {t('home:commercial')}{' '}
                </p>
            </div>

            <ul className={s.catalog_items_wr}>
                {fakeCatalog.map((item) => {
                    return (
                        <li className={s.catalog_item} key={item.id}>
                            <p className={s.catalog_letter}>{item.letter}</p>
                            <ul className={s.catalog_subitems_wr}>
                                {item.data.map((subitem) => {
                                    return (
                                        <li
                                            className={s.catalog_subitem}
                                            key={subitem.id}
                                        >
                                            {subitem.text}
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
