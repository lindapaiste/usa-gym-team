import { groupBy, mapValues } from 'lodash';
import { rows } from './source';
import type {
    AthleteStats,
    DetailedAthleteStats,
    Row,
    YearStats,
} from './types';
import { separateJuniorSenior } from './util';
import { yearStats } from './yearUtil';

const rowsByAthlete: Record<string, Row[]> = groupBy(
    rows,
    (r) => r.athleteSlug
);

const dataToYears = (rows: Row[]): YearStats | null => {
    if (!rows.length) return null;
    const years = rows.map((r) => r.year);
    return yearStats(years);
};

/**
 * Used for overall athlete stats,
 * and stats for an athlete's experience within a team.
 */
export const createAthleteStats = (rows: Row[]): AthleteStats => {
    const { firstName, lastName, athleteSlug, fullName } = rows[0];
    const data = separateJuniorSenior(rows);
    const levelByYear = Object.fromEntries(
        rows.map((row) => [row.year, row.level])
    );
    return {
        total: dataToYears(rows)!,
        junior: dataToYears(data.junior),
        senior: dataToYears(data.senior),
        levelByYear,
        firstName,
        lastName,
        slug: athleteSlug,
        name: fullName,
    };
};

/**
 * Adds additional properties which are only used for athlete detail page.
 */
const createDetailedAthleteStats = (rows: Row[]): DetailedAthleteStats => {
    const yearsByClub = groupBy(rows, (row) => row.clubSlug);
    const clubs = Object.values(yearsByClub).map((rows) => ({
        ...dataToYears(rows)!,
        slug: rows[0].clubSlug,
        name: rows[0].club,
    }));
    return {
        ...createAthleteStats(rows),
        clubs
    };
};

export const athleteSlugs = Object.keys(rowsByAthlete);

export const statsByAthlete = mapValues(
    rowsByAthlete,
    createDetailedAthleteStats
);

export const athleteStats = Object.values(statsByAthlete);

export const getAthleteStats = (slug: string) => statsByAthlete[slug];
