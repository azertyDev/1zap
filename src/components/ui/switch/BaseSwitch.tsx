import { FC, InputHTMLAttributes } from 'react';
import s from './index.module.scss';

interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {}

export const BaseSwitch: FC<SwitchProps> = (props) => {
    return (
        <label className={s.switch}>
            <input checked={props.checked} type="checkbox" role="switch" {...props} />
        </label>
    );
};
