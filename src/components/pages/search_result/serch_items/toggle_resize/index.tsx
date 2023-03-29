import { Dispatch, FC, SetStateAction } from 'react';

import s from './index.module.scss';
import { Icon } from 'components/ui/icon';

export const ToggleResize: FC<{
    mapIsOpen: boolean;
    fun: (val: boolean | ((prev: boolean) => boolean)) => () => void;
}> = ({ mapIsOpen, fun }): JSX.Element => {
    return (
        <div className={s.toggle_size} onClick={fun((prev: boolean) => !prev)}>
            {mapIsOpen ? (
                <Icon size={17} name={'zoom_out_map'} style={s.resize} />
            ) : (
                <Icon size={17} name={'zoom_in_map'} style={s.resize} />
            )}
        </div>
    );
};
