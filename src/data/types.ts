import type { Level, Row } from './source/types';
export type { Level, Row } from './source/types';

export interface Named {
    name: string;
    slug: string;
}

export interface ByLevel<T> {
    total: T;
    junior: T;
    senior: T;
}

export interface NullableByLevel<T> {
    total: T;
    junior: T | null;
    senior: T | null;
}

export interface Streak {
    years: number[];
    start: number;
    end: number;
    yearCount: number;
}

export interface YearStats extends Streak {
    clusters: number[][];
    longestStreak: Streak | null;
}

export interface TeamStats extends ByLevel<Row[]> {
    year: number;
    // TODO: move previous/future experience up to here.
}

export interface PersonYears extends Named {
    yearsPrevious: number;
    yearsFuture: number;
}

export interface PersonName extends Named {
    firstName: string;
    lastName: string;
}

export interface AthleteStats extends PersonName, NullableByLevel<YearStats> {
    levelByYear: Record<string | number, Level>;
}

export interface AthleteClub extends YearStats, Named {}

export interface DetailedAthleteStats extends AthleteStats {
    clubs: AthleteClub[];
    results: any[] | null; // TODO;
}

export interface RelatedAthlete {
    slug: string;
    similarity: number;
    data: AthleteStats;
}
