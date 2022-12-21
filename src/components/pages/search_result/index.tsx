import { FC } from 'react';
import { ResultMap } from 'components/pages/search_result/result_map';
import { ResultTableForm } from 'components/pages/search_result/result_table_form';

import { YMaps } from '@pbe/react-yandex-maps';

export const SearchResult: FC = (): JSX.Element => {
    return (
        <div>
            <YMaps
                query={{
                    lang: 'en_RU',
                    ns: 'use-load-option',
                    load: 'Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon',
                }}
            >
                <ResultMap />
                {/*<ResultTableForm />*/}
            </YMaps>
        </div>
    );
};
