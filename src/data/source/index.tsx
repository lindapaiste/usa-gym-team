import { deburr } from 'lodash';
import type { RowOriginal, Row, Level } from './types';
import data from './roster.json';

export const createSlug = (text: string): string =>
    deburr(text).toLowerCase().replaceAll(' ', '-');

const enhanceRow = (row: RowOriginal): Row => {
    const fullName = `${row.firstName} ${row.lastName}`;
    return {
        ...row,
        fullName,
        level: row.level as Level,
        athleteSlug: createSlug(fullName),
        clubSlug: createSlug(row.club),
    };
};

const unmodifiedRows = data.map(enhanceRow);

/**
 * Due to COVID-19 there was no national championship in 2020.
 * Only athletes who were added to the team during 2020 are listed in the source data with `year: 2020`.
 * So copy all 2019 athletes into 2020.
 */
const copiedRows = unmodifiedRows
    .filter((row) => row.year === 2019)
    .map((row) => ({ ...row, year: 2020 }));
export const rows_ = unmodifiedRows.concat(copiedRows);

export const rows = unmodifiedRows;
