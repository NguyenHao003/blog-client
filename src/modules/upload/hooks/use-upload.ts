import { useMutation } from '@tanstack/react-query';
import { uploadApis } from '../apis';
import { UPLOAD_FOLDER } from '../enums';

interface UploadFileParams {
    file: File;
    folder: UPLOAD_FOLDER;
}

export const useUpload = () => {
    return useMutation({
        mutationFn: async ({ file, folder }: UploadFileParams) => {
            // 1. Get file extension
            const filenameParts = file.name.split('.');
            const extension =
                filenameParts.length > 1 ? filenameParts.pop() || '' : '';

            // 2. Get presigned URL from backend
            const response = await uploadApis.getUploadUrl({
                folder,
                contentType: file.type,
                fileExtension: extension,
            });

            // API structure returns standard ApiResponse
            const { fileId, presignedUrl, publicUrl } = response.data?.data;

            // 3. Upload the actual file directly to S3
            await uploadApis.uploadFileToS3(presignedUrl, file);

            // Return the file identifier (can be stored in DB later)
            return {
                fileId,
                publicUrl,
            };
        },
    });
};
