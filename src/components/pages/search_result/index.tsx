import { FC } from 'react';
import { ResultMap } from 'components/pages/search_result/result_map';
import { ResultTableForm } from 'components/pages/search_result/result_table_form';

export const SearchResult: FC = (): JSX.Element => {
    return (
        <main>
            <ResultMap />
            <ResultTableForm />
        </main>
    );
};
