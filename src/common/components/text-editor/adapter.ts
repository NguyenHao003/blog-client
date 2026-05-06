import { uploadApis } from '@/modules/upload/apis';
import { UPLOAD_FOLDER } from '@/modules/upload/enums';
import { Editor } from '@ckeditor/ckeditor5-core';
import {
    FileLoader,
    UploadAdapter,
} from '@ckeditor/ckeditor5-upload/src/filerepository';

function uploadAdapter(loader: FileLoader): UploadAdapter {
    return {
        upload: () => {
            return new Promise(async (resolve, reject) => {
                try {
                    const file = await loader.file;

                    if (!file) {
                        return reject('Upload error: No file selected');
                    }

                    const fileExtension = file.name.split('.').pop() || '';

                    // 1. Get Presigned URL
                    const response = await uploadApis.getUploadUrl({
                        folder: UPLOAD_FOLDER.POST,
                        contentType: file.type,
                        fileExtension: fileExtension,
                    });

                    if (response.data.success && response.data.data) {
                        const { presignedUrl, publicUrl } = response.data.data;

                        // 2. Upload to S3
                        await uploadApis.uploadFileToS3(presignedUrl, file);

                        resolve({
                            default: publicUrl,
                        });
                    } else {
                        reject('Upload error: Failed to get upload URL');
                    }
                } catch (error) {
                    console.error('CKEditor Upload Error:', error);
                    reject('Upload error');
                }
            });
        },
        abort: () => {},
    };
}

export function uploadPlugin(editor: Editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return uploadAdapter(loader);
    };
}

