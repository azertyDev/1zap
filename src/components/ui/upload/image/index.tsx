import { ChangeEvent, MouseEvent, useState } from 'react';
import { toast } from 'react-hot-toast';
import { imageApi } from 'src/utils/api';
import { Icon } from 'components/ui/icon';

import s from './index.module.scss';

interface FileUploaderProps {
    name: string;
    preview?: string;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

export const ImageUpload = (props: FileUploaderProps) => {
    const [imageData, setImageData] = useState<IImage>({ id: null, url: '' });

    const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
        var formData = new FormData();
        formData.append('image', event.target.files![0]);

        await imageApi
            .upload(formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((data: IImage) => {
                setImageData(data);
                props.setFieldValue(props.name, data);
                toast.success('Image uploaded successfully', {
                    duration: 5000,
                });
            })
            .catch(({ response }: any) => {
                if (response) {
                    toast.error(response.data.error, {
                        duration: 5000,
                    });
                }
            });
    };

    const deleteCurrentImage = async (event: MouseEvent<HTMLElement>) => {
        await imageApi
            .delete(imageData.id!)
            .then((data) => {
                toast.success('Image deleted', {
                    duration: 5000,
                });

                setImageData({
                    id: null,
                    url: '',
                });
                props.setFieldValue(props.name, '');
            })
            .catch(({ response }) => {
                if (response) {
                    toast.error(response.data.error, {
                        duration: 5000,
                    });
                }
            });
    };

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
