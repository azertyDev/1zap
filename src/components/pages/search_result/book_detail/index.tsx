import React, { FC } from 'react';

import s from './index.module.scss';

import { BookDetailStepOne } from 'components/pages/search_result/book_detail/book_detail_step_one';
import { useStepOrder } from 'src/hooks/common/useStepOrder';
import { BookDetailStepTwo } from 'components/pages/search_result/book_detail/book_detail_step_two';

export const BookDetail: FC<{
    fun: (val: boolean) => () => void;
    handleOpen: (val: boolean) => () => void;
}> = ({ fun, handleOpen }): JSX.Element => {
    const { order, handleOrder } = useStepOrder();

    const handleLoginClose = () => {
        document.addEventListener('click', (ev: any) => {
            if (ev?.target?.id === 'book_wr') {
                fun(false)();
            }
        });
    };

    return (
        <div className={s.book_wr} id={'book_wr'} onClick={handleLoginClose}>
            {order === 1 && (
                <BookDetailStepOne fun={handleOrder} handleOpen={handleOpen} />
            )}
            {order === 2 && <BookDetailStepTwo fun={fun} />}
        </div>
    );
};
