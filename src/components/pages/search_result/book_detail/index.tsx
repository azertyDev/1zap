import React, { FC, useCallback, useState } from 'react';

import s from './index.module.scss';

import { BookDetailStepOne } from 'components/pages/search_result/book_detail/book_detail_step_one';
import { useStepOrder } from 'src/hooks/common/useStepOrder';
import { BookDetailStepTwo } from 'components/pages/search_result/book_detail/book_detail_step_two';

export const BookDetail: FC<{
    toggleBookDetail: (val: boolean) => () => void;
}> = ({ toggleBookDetail }): JSX.Element => {
    const { order, handleOrder } = useStepOrder();

    const [data, setData] = useState(null);

    const handleLoginClose = useCallback(() => {
        document.addEventListener('click', (ev: any) => {
            if (ev?.target?.id === 'book_wr') {
                toggleBookDetail(false)();
            }
        });
    }, []);

    return (
        <div className={s.book_wr} id={'book_wr'} onClick={handleLoginClose}>
            {order === 1 && <BookDetailStepOne handleOrder={handleOrder} toggleBookDetail={toggleBookDetail} />}
            {order === 2 && <BookDetailStepTwo handleOrder={handleOrder} toggleBookDetail={toggleBookDetail} />}
        </div>
    );
};
