import { FC, useContext, useEffect, useState } from 'react';

import s from './index.module.scss';
import { useTranslation } from 'next-i18next';
import { useHandleCatalog } from 'src/hooks/search_home/useHandleCatalog';
import { catalogContext } from 'components/pages/home';

const parseString = require('xml2js').parseString;

export const SearchCatalog: FC = (): JSX.Element => {
    const { activeCat, handleActiveCatalog } = useHandleCatalog();
    const catalogData = useContext(catalogContext);
    const [catalog, setCatalog] = useState<{ $: { name: string; brand: string; code: string } }[] | null>(null);
    const { t } = useTranslation();
    let letter = '';

    useEffect(() => {
        if (catalogData) {
            parseString(catalogData, function (err: string, result: any) {
                setCatalog(result?.response?.ListCatalogs[0]?.row);
            });
        }
    }, []);

    console.log(catalog);
    return (
        <div className={s.catalog}>
            <div>
                <p onClick={handleActiveCatalog(1)} className={`${s.cat_text} ${activeCat === 1 ? s.active : ''}`}>
                    {t('home:light')}
                </p>
                <p onClick={handleActiveCatalog(2)} className={`${s.cat_text} ${activeCat === 2 ? s.active : ''}`}>
                    {t('home:commercial')}{' '}
                </p>
            </div>
            <p className={s.text_resp}>Основные каталоги </p>
            <div className={s.catalog_items_box}>
                <ul className={s.catalog_items_wr}>
                    {catalog &&
                        catalog.map(({ $ }) => {
                            const jsxEl = (
                                <li className={s.catalog_item} key={$.brand}>
                                    <p className={s.catalog_letter}>
                                        {$.name[0] !== letter ? $.name[0] : <span></span>}
                                    </p>
                                    <ul>
                                        <li className={s.catalog_subitem}>{$.name}</li>
                                    </ul>
                                </li>
                            );
                            letter = $.name[0];

                            return jsxEl;
                        })}
                </ul>
            </div>
        </div>
    );
};
