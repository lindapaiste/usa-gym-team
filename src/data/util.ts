import { sortBy } from 'lodash';
import type { ByLevel, Row } from './types';

export const alphaSort = <T extends { firstName: string; lastName: string }>(
    data: T[]
): T[] => sortBy(data, [(o) => o.lastName, (o) => o.firstName]);

export const separateJuniorSenior = (rows: Row[]): ByLevel<Row[]> => {
    const junior = rows.filter((r) => r.level === 'Junior');
    const senior = rows.filter((r) => r.level === 'Senior');
    return { junior, senior, total: rows };
};
