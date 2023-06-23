import { Icon } from 'components/ui/icon';
import { useImageUpload } from 'src/hooks/common/useImageUpload';

import s from './index.module.scss';

interface FileUploaderProps {
    id?: any;
    name: string;
    preview?: string;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

export const ImageUpload = (props: FileUploaderProps) => {
    const { deleteCurrentImage, handleChange, imageData } = useImageUpload(props);

    return (
        <div className={s.wrapper}>
            {!!props.preview ? (
                <div className={s.preview_block}>
                    <img width={170} height={170} alt="preview" src={props.preview} />

                    <span onClick={(e) => deleteCurrentImage(props.id)}>
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
