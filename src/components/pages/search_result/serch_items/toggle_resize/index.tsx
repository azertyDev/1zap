import { Dispatch, FC, SetStateAction } from 'react';

import s from './index.module.scss';
import { Icon } from 'components/ui/icon';

export const ToggleResize: FC<{
    isResised: boolean;
    fun: Dispatch<SetStateAction<boolean>>;
}> = ({ isResised, fun }): JSX.Element => {
    const handleOpen = () => {
        return fun((prev) => !prev);
    };

    return (
        <div className={s.toggle_size} onClick={handleOpen}>
            {isResised ? (
                <Icon size={17} name={'zoom_out_map'} style={s.resize} />
            ) : (
                <Icon size={17} name={'zoom_in_map'} style={s.resize} />
            )}
        </div>
    );
};
