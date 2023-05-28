import { FC } from 'react';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';
import { Icon } from 'components/ui/icon';
import s from './index.module.scss';

export const Pagination: FC<ReactPaginateProps> = (props) => {
    return (
        <ReactPaginate
            {...props}
            breakLabel="..."
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            containerClassName={s.root}
            nextClassName={s.nextClassName}
            pageClassName={s.pageClassName}
            activeClassName={s.selectedPage}
            previousClassName={s.previousClassName}
            nextLabel={<Icon name="arrow_forward" size={18} color="#9A9EA7" />}
            previousLabel={<Icon name="arrow_back" size={18} color="#9A9EA7" />}
        />
    );
};
