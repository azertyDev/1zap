import React, { FC } from 'react';
import s from './index.module.scss';
import { Icon } from 'components/ui/icon';
import { Button } from 'components/ui/button';
import { useImageUpload } from 'src/hooks/common/useImageUpload';
import { useTranslation } from 'next-i18next';

export const ImageIploadVin: FC<{
    imgLength: number;
    setVal: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void>;
}> = ({ imgLength, setVal }): JSX.Element => {
    const { handleChange, deleteCurrentImage } = useImageUpload({ setFieldValue: setVal, name: 'image' });
    const { t } = useTranslation();

    return (
        <>
            {imgLength === 0 ? (
                <>
                    <label htmlFor={'file'} className={s.file_label}>
                        <Icon size={20} name={'backup'} color={'#fff'} />
                        {t('common:downloadPhoto')}
                    </label>
                    <input
                        onChange={handleChange}
                        id={'file'}
                        accept={'image/*'}
                        type={'file'}
                        className={s.file_input}
                    />
                </>
            ) : (
                <Button fullWidth variant={'primary'} type={'button'} onClick={deleteCurrentImage}>
                    {t('common:deletePhoto')}
                </Button>
            )}
        </>
    );
};
