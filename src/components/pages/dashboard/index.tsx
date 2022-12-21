import { FC } from 'react';
import s from './index.module.scss';

interface PropsType extends FC {
    name: string;
}

export default ({ name }: PropsType) => {
    return <div className={s.wrapper}>Content</div>;
};
