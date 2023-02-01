import { useState } from 'react';

export const useOpenCloseWithVal = () => {
    const [openClose, setOpenCLose] = useState(false);

    const handleOpenClose = (val: boolean) => {
        return () => setOpenCLose(val);
    };

    return { openClose, handleOpenClose };
};