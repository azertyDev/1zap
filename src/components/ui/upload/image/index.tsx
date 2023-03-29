import { ChangeEvent, MouseEvent, useState } from 'react';
import { toast } from 'react-hot-toast';
import { imageApi } from 'src/utils/api';
import { Icon } from 'components/ui/icon';

import s from './index.module.scss';
import { useImageUpload } from 'src/hooks/common/useImageUpload';

interface FileUploaderProps {
    name: string;
    preview?: string;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

export const ImageUpload = (props: FileUploaderProps) => {
    const { imageData, deleteCurrentImage, handleChange } = useImageUpload(props);

    return (
        <div className={s.wrapper}>
            {!!imageData.url ? (
                <div className={s.preview_block}>
                    <img width={170} height={170} alt="preview" src={imageData.url.replace('onezap', '1zap')} />

                    <span onClick={deleteCurrentImage}>
                        <Icon name="delete" size={18} color="#C6303C" />
                    </span>
                </div>
            ) : (
                <div className={s.imageUpload}>
                    <label htmlFor="file">
                        <Icon name="backup" size={32} color="#C6303C" />
                        <input
                            name={props.name}
                            id="file"
                            type="file"
                            onChange={handleChange}
                            style={{ display: 'none' }}
                            accept="image/*"
                        />
                    </label>
                </div>
            )}
        </div>
    );
};
