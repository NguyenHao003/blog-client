/**
 * Generic API Response wrapper
 * @template T The type of the data returned by the API
 */
export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
    statusCode?: number;
}

export interface PaginationResponse<T> {
    data: {
        items: T[];
        metadata: {
            page: number;
            pageSize: number;
            totalItems: number;
            totalPages: number;
        };
    };
}
