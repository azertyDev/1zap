import React, { FC, useCallback, useEffect, useState } from 'react';

import s from './index.module.scss';

import { BookDetailStepOne } from 'components/pages/search_result/book_detail/book_detail_step_one';
import { useStepOrder } from 'src/hooks/common/useStepOrder';
import { BookDetailStepTwo } from 'components/pages/search_result/book_detail/book_detail_step_two';
import { useStore } from 'src/store/useStore';

export const BookDetail = ({}): JSX.Element => {
    const { order, handleOrder } = useStepOrder();

    const { toggleBookDetail, bookDetailToggle } = useStore((state) => state);

    const handleLoginClose = useCallback(() => {
        document.addEventListener('click', (ev: any) => {
            if (ev?.target?.id === 'book_wr') {
                toggleBookDetail(false)();
            }
        });
    }, []);

    useEffect(() => {
        return () => handleOrder(1)();
    }, [bookDetailToggle]);

    return (
        <div className={`${s.book_wr} ${bookDetailToggle ? s.active : ''}`} id={'book_wr'} onClick={handleLoginClose}>
            {order === 1 && (
                <BookDetailStepOne handleOrder={handleOrder} toggleBookDetail={toggleBookDetail} value={null} />
            )}
            {order === 2 && <BookDetailStepTwo handleOrder={handleOrder} toggleBookDetail={toggleBookDetail} />}
        </div>
    );
};
