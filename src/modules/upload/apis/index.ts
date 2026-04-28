import { ApiResponse } from '@/common/shared/types/api-response';
import axiosInstance from '@/lib/axios';
import axios from 'axios';
import { UPLOAD_FOLDER } from '../enums';
import { PresignedUrlData } from '../types';

export const uploadApis = {
    getUploadUrl: async (data: {
        folder: UPLOAD_FOLDER;
        contentType: string;
        fileExtension: string;
    }) => {
        return axiosInstance.post<ApiResponse<PresignedUrlData>>(
            'storage/upload',
            data
        );
    },

    uploadFileToS3: async (presignedUrl: string, file: File) => {
        return axios.put(presignedUrl, file, {
            headers: {
                'Content-Type': file.type,
            },
        });
    },
};
