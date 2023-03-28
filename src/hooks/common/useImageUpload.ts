import { ChangeEvent, MouseEvent, useState } from 'react';
import { imageApi } from 'src/utils/api';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'next-i18next';

interface FileUploaderProps {
    name: string;
    preview?: string;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

export const useImageUpload = (props: FileUploaderProps) => {
    const [imageData, setImageData] = useState<IImage>({ id: null, url: '' });
    const { t } = useTranslation('helpers');

    const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
        let formData = new FormData();
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
                toast.success(t('image_add'), {
                    duration: 5000,
                });
            })
            .catch(({ response }: any) => {
                if (response) {
                    toast.error(t('image_err_add'), {
                        duration: 5000,
                    });
                }
            });
    };

    const deleteCurrentImage = async (event: MouseEvent<HTMLElement>) => {
        await imageApi
            .delete(imageData.id!)
            .then((data) => {
                toast.success(t('image_del'), {
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
                    toast.error(t('image_err_del'), {
                        duration: 5000,
                    });
                }
            });
    };

    return { handleChange, deleteCurrentImage, imageData };
};
