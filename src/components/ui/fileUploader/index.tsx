import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { axiosInstance } from 'src/utils/axios';
import { Icon } from '../icon';

import s from './index.module.scss';

interface FileUploaderProps {
    name: string;
    preview?: string;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

export const FileUploader = (props: FileUploaderProps) => {
    const [imageData, setImageData] = useState<IImage>();

    const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
        var formData = new FormData();
        formData.append('image', event.target.files![0]);

        await axiosInstance
            .post<IImage>('/images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((data: AxiosResponse<IImage>) => {
                if (data.status === 201) {
                    setImageData(data.data);
                    props.setFieldValue(props.name, data.data.url);
                }
            })
            .catch(({ response }: any) => {
                if (response) {
                    console.log('response: ', response.data.error);
                }
            });
    };

    const deleteCurrentImage = async (event: MouseEvent<HTMLElement>) => {
        await axios
            .delete(`https://1zap.uz/api/images/${imageData?.id}`)
            .then((data) => {
                if (data) {
                    console.log(data);
                }
                if (data.status === 200) {
                    props.setFieldValue(props.name, '');
                }
            })
            .catch(({ response }) => {
                if (response) {
                    console.log(response);
                }
            });
    };

    return (
        <div className={s.wrapper}>
            {!!props.preview ? (
                <div className={s.preview_block}>
                    <img width={170} height={170} alt="preview" src={props.preview.replace('onezap', '1zap')} />

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
