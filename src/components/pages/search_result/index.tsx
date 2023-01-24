import { FC } from 'react';
import { ResultMap } from 'components/pages/search_result/result_map';

import s from './index.module.scss';

export const SearchResult: FC = (): JSX.Element => {
    return (
        <main className={s.main}>
            <ResultMap />
        </main>
    );
};
