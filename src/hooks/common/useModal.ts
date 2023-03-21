import { useState } from 'react';

export const useModal = (initState?: boolean) => {
    const [open, setOpen] = useState(!!initState);

    const handleModalOpen = () => {
        setOpen(true);
    };
    const handleModalClose = () => {
        setOpen(false);
    };

    return {
        open,
        handleModalOpen,
        handleModalClose,
    };
};
