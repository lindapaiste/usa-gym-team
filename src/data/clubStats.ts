import { groupBy, mapValues, uniq } from 'lodash';
import { createAthleteStats } from './athleteStats';
import { rows } from './source';
import type { Row } from './types';
import { separateJuniorSenior } from './util';
import { yearStats } from './yearUtil';

const rowsByClub: Record<string, Row[]> = groupBy(rows, (r) => r.clubSlug);

const createClubStats = (rows: Row[]) => {
    const { clubSlug, club } = rows[0];
    const athletes = uniq(rows.map((r) => r.athleteSlug));
    const uniqueYears = uniq(rows.map((r) => r.year));
    const athletesByYear = mapValues(
        groupBy(rows, (r) => r.year),
        separateJuniorSenior
    );
    const dataByAthlete = groupBy(rows, (r) => r.athleteSlug);
    const yearsByAthlete = mapValues(dataByAthlete, createAthleteStats);
    return {
        slug: clubSlug,
        name: club,
        totalAthleteYears: rows.length,
        countDistinctAthletes: athletes.length,
        athletes,
        years: yearStats(uniqueYears),
        yearsRepresented: uniqueYears.length,
        avgYearsPerAthlete: rows.length / athletes.length,
        mostConcurrentAthletes: Math.max(
            ...Object.values(athletesByYear).map((year) => year.total.length)
        ),
        athletesByYear,
        yearsByAthlete,
        // first athlete
        // longest drought
    };
};

export type ClubStats = ReturnType<typeof createClubStats>;

export const clubSlugs = Object.keys(rowsByClub);

export const statsByClub = mapValues(rowsByClub, createClubStats);

export const clubStats = Object.values(statsByClub);

export const getClubStats = (slug: string) => statsByClub[slug];
