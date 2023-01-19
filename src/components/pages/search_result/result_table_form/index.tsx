import { FC } from 'react';

import s from './index.module.scss';
import { Container } from 'components/ui/container';

export const ResultTableForm: FC = (): JSX.Element => {
    return (
        <div className={s.table_wr}>
            <Container>
                <div className={s.table}>
                    <div className={s.table_row}>
                        <div className={`${s.table_el} ${s.table_h}`}>
                            Производитель
                        </div>
                        <div className={`${s.table_el} ${s.table_h}`}>
                            Номер
                        </div>
                        <div className={`${s.table_el} ${s.table_h}`}>
                            Наименование
                        </div>
                        <div className={`${s.table_el} ${s.table_h}`}>
                            Наличие
                        </div>
                        <div className={`${s.table_el} ${s.table_h}`}>Цена</div>
                        <div className={`${s.table_el} ${s.table_h}`}>
                            Продавец
                        </div>
                    </div>

                    <div className={s.table_row}>
                        <div className={`${s.table_el} ${s.table_b}`}>
                            <h5>PARTS-MALL</h5>
                        </div>
                        <div className={`${s.table_el} ${s.table_b}`}>
                            <h5>PARTS-MALL</h5>
                            <p>Запрошенный номер</p>
                        </div>
                        <div className={`${s.table_el} ${s.table_b}`}>
                            <h5>
                                PBA001PMC_фильтр масляный!\ Mazda
                                323/3/626,Nissan Primera 1.3-2.2 89
                            </h5>
                            <p>
                                Обязательно получите подтверждение резерва на
                                1zap или по звонку
                            </p>
                        </div>
                        <div className={`${s.table_el} ${s.table_b}`}>
                            <h5>177 шт.</h5>
                            <p>24ч назад В наличии</p>
                        </div>
                        <div className={`${s.table_el} ${s.table_b}`}>
                            <h5>$3,5</h5>
                            <p>
                                Обязательно получите подтверждение резерва на
                                1zap или по звонку
                            </p>
                        </div>
                        <div className={`${s.table_el} ${s.table_b}`}>
                            <button type={'button'}>
                                <span>Открыть контакт</span>
                                <span>Ифтихор, 77</span>
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};
