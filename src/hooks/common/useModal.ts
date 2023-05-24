import { useState } from 'react';

export const useModal = (initState?: boolean) => {
    const [open, setOpen] = useState(false);

    const handleModalOpen = () => {
        setOpen(true);
    };
    const handleModalClose = () => {
        document.addEventListener('click', (ev: any) => {
            if (ev?.target?.id === 'modal_id_wr') {
                setOpen(false);
            }
        });
        setOpen(false);
    };

    return {
        open,
        handleModalOpen,
        handleModalClose,
    };
};
