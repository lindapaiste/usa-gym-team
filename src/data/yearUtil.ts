import { first, last, maxBy, sortBy } from 'lodash';
import { Streak, YearStats } from './types';

/**
 * Separates non-continuous years into continuous clumps.
 */
const clusterYears = (years: number[]): number[][] => {
    const clusters: number[][] = [];
    let current: number[] = [];
    years.forEach((year, i) => {
        if (year - 1 === years[i - 1]) {
            current.push(year);
        } else {
            current = [year];
            clusters.push(current);
        }
    });
    return clusters;
};

const rangeStats = (sorted: number[]): Streak => ({
    years: sorted,
    start: first(sorted)!,
    end: last(sorted)!,
    yearCount: sorted.length,
});

// TODO: longest gap
export const yearStats = (unsorted: number[]): YearStats => {
    const years = sortBy(unsorted);
    const clusters = clusterYears(years);
    const streak = maxBy(clusters, (c) => c.length);
    return {
        ...rangeStats(years),
        clusters,
        longestStreak: streak ? rangeStats(streak) : null,
    };
};

export const formatYearClusters = (clusters: number[][]): string => {
    return clusters
        .map((array) =>
            array.length === 1 ? array[0] : `${first(array)} - ${last(array)}`
        )
        .join(', ');
};

export const formatAsRange = ({
    start,
    end,
}: {
    start: number;
    end: number;
}): string => {
    if (start === end) return `${start}`;
    return `${start} - ${end}`;
};
