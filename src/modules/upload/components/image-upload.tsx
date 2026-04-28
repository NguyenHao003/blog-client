import { PlusOutlined } from '@ant-design/icons';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { Image, Spin, Upload } from 'antd';
import React, { ReactNode, useEffect, useState } from 'react';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

interface ImageUploadProps extends Omit<UploadProps, 'value' | 'onChange'> {
    value?: any;
    onChange?: (fileList: any) => void;
    placeholder?: string;
    loading?: boolean;
    description?: ReactNode;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
    value,
    onChange,
    loading = false,
    description,
    ...props
}) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    useEffect(() => {
        if (typeof value === 'string') {
            setFileList([
                {
                    uid: '-1',
                    name: 'image',
                    status: 'done',
                    url: value,
                },
            ]);
        } else if (Array.isArray(value)) {
            setFileList(value);
        } else if (!value) {
            setFileList([]);
        }
    }, [value]);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({
        fileList: newFileList,
    }) => {
        setFileList(newFileList);
        onChange?.(newFileList);
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    return (
        <div
            style={{ position: 'relative', width: 'fit-content' }}
            className="flex items-center gap-5"
        >
            <Upload
                listType="picture-card"
                maxCount={1}
                accept="image/*"
                disabled={loading || props.disabled}
                {...props}
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={() => false}
            >
                {fileList.length >= (props.maxCount || 1) ? null : uploadButton}
            </Upload>

            {description}

            {loading && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10,
                    }}
                >
                    <Spin />
                </div>
            )}

            <Image
                alt="preview"
                wrapperStyle={{ display: 'none' }}
                preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                        !visible && setPreviewImage(''),
                }}
                src={previewImage}
            />
        </div>
    );
};
