import { ChangeEvent, MouseEvent, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Icon } from 'components/ui/icon';

import s from './index.module.scss';
import { Button } from '../../button';

interface FileUploadProps {
    title: string;
    name: string;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

export const FileUpload = ({ title, name, setFieldValue }: FileUploadProps) => {
    const [file, setFile] = useState();
    const fileInput = useRef<HTMLInputElement>(null);

    const handleFileUpload = (event: any) => {
        setFile(event.target.files[0]);
        setFieldValue(name, event.target.files[0]);
    };

    return (
        <div className={s.wrapper}>
            <input
                ref={fileInput}
                onChange={handleFileUpload}
                type="file"
                style={{ display: 'none' }}
                // accept="xlsx, xlsm, xltm"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/vnd.ms-excel.sheet.macroEnabled.12"
            />

            <Button variant="primary" fullWidth onClick={() => fileInput?.current?.click()}>
                <Icon name="cloud_upload" color="white" />
                {title}
            </Button>
        </div>
    );
};
