import React, { FC, useRef, useState } from 'react';

import { Map, Overlay } from 'pigeon-maps';
import s from './index.module.scss';
import Image from 'next/image';

import { useTranslation } from 'next-i18next';
import { FilterSelections } from 'components/ui/filter_selections';
import { useRouter } from 'next/router';
import { FilterSelect } from 'components/ui/filter_selections/filter_select';

const fakeAnchor = [
    [41.31240320650527, 69.27836058056674],
    [41.312801603213416, 69.28121824199522],
    [41.31578747810986, 69.2709021702546],
];

export const ResultMap: FC = (): JSX.Element => {
    const { t } = useTranslation();

    const [mapIsOpen, setIsOpen] = useState(false);

    const handleMapIsOpen = () => {
        return setIsOpen((prev) => !prev);
    };

    const {
        query: {
            payment,
            delivery,
            services,
            supply,
            producer,
            condition,
            updates,
        },
        push,
        pathname,
        query,
    } = useRouter();

    const handleFilter = (key: string) => {
        return (ev: any) => {
            push({
                pathname: pathname,
                query: {
                    ...query,
                    page: 1,
                    [key]: ev.value,
                },
            });
        };
    };

    return (
        <div className={s.map_wr}>
            <div className={`${s.map} ${mapIsOpen ? s.active : ''}`}>
                <Map
                    defaultCenter={[41.31300484525912, 69.27182341706133]}
                    defaultZoom={17}
                >
                    {fakeAnchor.map((item, index) => {
                        return (
                            <Overlay
                                anchor={item as [number, number]}
                                offset={[30, 30]}
                                key={index}
                            >
                                <div
                                    className={s.mark}
                                    onClick={() => alert(1)}
                                >
                                    <div className={s.point_wr}>
                                        <Image
                                            src="/assets/icons/map_point.svg"
                                            alt={'point'}
                                            fill={true}
                                        />
                                        <p className={s.point_number}>
                                            {String(1).slice(0, 2)}
                                        </p>
                                    </div>
                                    <div className={s.mark_price}>$3,5</div>
                                </div>
                            </Overlay>
                        );
                    })}

                    <div className={s.shadow}></div>
                </Map>
            </div>

            <div className={`${s.search_wr} ${mapIsOpen ? s.active : ''}`}>
                <button className={s.btn_map} onClick={handleMapIsOpen}>
                    {mapIsOpen ? (
                        <Image
                            src={'/assets/icons/search.svg'}
                            alt={'map'}
                            width={15}
                            height={15}
                        />
                    ) : (
                        <Image
                            src={'/assets/images/search/mini_map.svg'}
                            alt={'map'}
                            width={18}
                            height={21}
                        />
                    )}

                    <p>
                        {mapIsOpen
                            ? t('common:openSearch')
                            : t('common:openMap')}
                    </p>
                </button>

                <div className={`${s.search} ${mapIsOpen ? s.notActive : ''}`}>
                    <div className={s.input_wr}>
                        <input
                            type={'text'}
                            placeholder={t('home:searchOem')!}
                        />
                        <button type="submit" className={s.btn_sub}>
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M2.74609 7.52734C3.40234 8.18359 4.19922 8.51172 5.13672 8.51172C6.07422 8.51172 6.87109 8.18359 7.52734 7.52734C8.18359 6.87109 8.51172 6.07422 8.51172 5.13672C8.51172 4.19922 8.18359 3.40234 7.52734 2.74609C6.87109 2.08984 6.07422 1.76172 5.13672 1.76172C4.19922 1.76172 3.40234 2.08984 2.74609 2.74609C2.08984 3.40234 1.76172 4.19922 1.76172 5.13672C1.76172 6.07422 2.08984 6.87109 2.74609 7.52734ZM9.63672 8.51172L13.3633 12.2383L12.2383 13.3633L8.51172 9.63672V9.03906L8.30078 8.82812C7.41016 9.60156 6.35547 9.98828 5.13672 9.98828C3.77734 9.98828 2.61719 9.51953 1.65625 8.58203C0.71875 7.64453 0.25 6.49609 0.25 5.13672C0.25 3.77734 0.71875 2.62891 1.65625 1.69141C2.61719 0.730469 3.77734 0.25 5.13672 0.25C6.49609 0.25 7.64453 0.730469 8.58203 1.69141C9.51953 2.62891 9.98828 3.77734 9.98828 5.13672C9.98828 5.62891 9.87109 6.19141 9.63672 6.82422C9.40234 7.43359 9.13281 7.92578 8.82812 8.30078L9.03906 8.51172H9.63672Z"
                                    fill="#fff"
                                />
                            </svg>

                            <span>{t('common:search')} </span>
                        </button>
                    </div>
                    <FilterSelections>
                        <FilterSelect
                            id={'payment'}
                            title={t('filter:payment')}
                            value={(payment ?? 'Aaaaaaaaaa') as string}
                            fun={handleFilter}
                            labelAlt={'Aaaaaaaaaa'}
                            options={[
                                {
                                    value: 'Aaaaaaaaaa',
                                    label: 'Aaaaaaaaaa',
                                },
                                { value: 'b', label: 'b' },
                            ]}
                        />
                        <FilterSelect
                            id={'delivery'}
                            title={t('filter:delivery')}
                            value={(delivery ?? 'a') as string}
                            fun={handleFilter}
                            labelAlt={'a'}
                            options={[
                                { value: 'a', label: 'a' },
                                { value: 'b', label: 'b' },
                            ]}
                        />
                        <FilterSelect
                            id={'services'}
                            title={t('filter:services')}
                            value={(services ?? 'a') as string}
                            fun={handleFilter}
                            labelAlt={'a'}
                            options={[
                                { value: 'a', label: 'a' },
                                { value: 'b', label: 'b' },
                            ]}
                        />

                        <FilterSelect
                            id={'supply'}
                            title={t('filter:supply')}
                            value={(supply ?? 'a') as string}
                            fun={handleFilter}
                            labelAlt={'a'}
                            options={[
                                { value: 'a', label: 'a' },
                                { value: 'b', label: 'b' },
                            ]}
                        />
                        <FilterSelect
                            id={'producer'}
                            title={t('filter:producer')}
                            value={(producer ?? 'a') as string}
                            fun={handleFilter}
                            labelAlt={'a'}
                            options={[
                                { value: 'a', label: 'a' },
                                { value: 'b', label: 'b' },
                            ]}
                        />

                        <FilterSelect
                            id={'condition'}
                            title={t('filter:condition')}
                            value={(condition ?? 'a') as string}
                            fun={handleFilter}
                            labelAlt={'a'}
                            options={[
                                { value: 'a', label: 'a' },
                                { value: 'b', label: 'b' },
                            ]}
                        />
                        <FilterSelect
                            id={'updates'}
                            title={t('filter:updates')}
                            value={(updates ?? 'a') as string}
                            fun={handleFilter}
                            labelAlt={'a'}
                            options={[
                                { value: 'a', label: 'a' },
                                { value: 'b', label: 'b' },
                            ]}
                        />
                    </FilterSelections>
                </div>
            </div>
        </div>
    );
};
