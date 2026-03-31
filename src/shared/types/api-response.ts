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
