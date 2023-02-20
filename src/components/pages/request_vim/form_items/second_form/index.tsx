import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { useTranslation } from 'next-i18next';



export const SecondFormVim: FC<{
    fun: Dispatch<SetStateAction<boolean>>;
}> = ({ fun }): JSX.Element => {

    const { t } = useTranslation();
    const [isDone, setIsDone] = useState(false);

    return (
        <div>

        </div>
    );
};
