import dayjs from 'dayjs';
import { DATE_FORMAT, SORT_ORDER } from '../enums';

export const setOrder = (sort: any, defaultOrder?: SORT_ORDER) => {
    const sortOrder =
        (sort.order === 'ascend' && SORT_ORDER.ASC) ||
        (sort.order === 'descend' && SORT_ORDER.DESC) ||
        defaultOrder;
    return sortOrder;
};

export const getSortOrder = (
    value: string | null | undefined,
    key: string | null | undefined,
    target: string
) => {
    if (key !== target) return null;
    if (value === 'ASC') return 'ascend';
    if (value === 'DESC') return 'descend';
    return null;
};

export function formattedDate(
    date?: string | number | Date | dayjs.Dayjs | null | undefined,
    format?: DATE_FORMAT | string
): string {
    return (
        (date && dayjs(date).format(format ?? DATE_FORMAT.DATE_MINUTE)) || ''
    );
}
