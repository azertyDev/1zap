import { FC } from 'react';
import s from './index.module.scss';

interface PropsType extends FC {
    query: {
        slug: string;
    };
}

export default (props: PropsType): JSX.Element => {
    return <div className={s.wrapper}>{props.query.slug}</div>;
};
