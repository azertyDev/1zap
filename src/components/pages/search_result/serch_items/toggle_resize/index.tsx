import { Dispatch, FC, SetStateAction } from 'react';

import s from './index.module.scss';
import { Icon } from 'components/ui/icon';

export const ToggleResize: FC<{
    mapIsOpen: boolean;
    fun: Dispatch<SetStateAction<boolean>>;
}> = ({ mapIsOpen, fun }): JSX.Element => {
    const handleOpen = () => {
        return fun((prev) => !prev);
    };

    return (
        <div className={s.toggle_size} onClick={handleOpen}>
            {mapIsOpen ? (
                <Icon size={17} name={'zoom_out_map'} style={s.resize} />
            ) : (
                <Icon size={17} name={'zoom_in_map'} style={s.resize} />
            )}
        </div>
    );
};
