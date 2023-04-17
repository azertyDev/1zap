import ReactPaginate from 'react-paginate';

import React, { FC, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

interface paginationInt {
    pageCount: number;
}

export const Pagination: FC<paginationInt> = ({ pageCount }): JSX.Element => {
    const {
        pathname,
        push,
        query,
        query: { page },
    } = useRouter();
    const { t } = useTranslation();

    const handlePage = useCallback(
        (ev: any) => {
            push({
                pathname: pathname,
                query: { ...query, page: ev.nextSelectedPage + 1 },
            });
        },
        [query]
    );

    return (
        <div className={`pagination ${+page! + 1 > pageCount ? 'hidenext' : ''} ${pageCount === 0 ? 'hideNext' : ''}`}>
            <ReactPaginate
                onClick={handlePage}
                pageCount={pageCount ? +pageCount : 0}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                activeLinkClassName={'active_box'}
                nextLabel={`${t('common:next')}`}
                forcePage={page ? +page - 1 : 0}
                breakLabel=".."
            />
        </div>
    );
};
