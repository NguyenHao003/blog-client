export interface CommonFilter {
    page?: number;
    pageSize?: number;
    sortField?: string | null;
    sortOrder?: string | null;
    keyword?: string | null;
}

export interface CommonAttribute {
    id?: string;
    startCreatedAt?: string | Date | null;
    endCreatedAt?: string | Date | null;
}
