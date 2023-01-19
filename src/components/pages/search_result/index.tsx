import { FC } from 'react';
import { ResultMap } from 'components/pages/search_result/result_map';
import { ResultTableForm } from 'components/pages/search_result/result_table_form';

import s from './index.module.scss';
import { NoResult } from 'components/pages/search_result/no_result';

export const SearchResult: FC = (): JSX.Element => {
    return (
        <main className={s.main}>
            <ResultMap />
            {/*<ResultTableForm />*/}
            <NoResult />
        </main>
    );
};
