import { athleteStats } from './athleteStats';
import { AthleteStats, RelatedAthlete, Level } from './types';
import { orderBy } from 'lodash';

/**
 * Compare 2 athletes to see how much their careers overlap.
 * 1 point for years on same level.
 * .5 point for years on different level.
 * -.25 point for years without overlap.
 */
const overlapScore = (
    current: Record<number, Level>,
    compareTo: Record<number, Level>
): number => {
    let score = 0;
    Object.entries(current).forEach(([year, level]) => {
        const compareLevel = compareTo[+year];
        if (compareLevel === level) {
            score += 2;
        } else if (compareLevel) {
            score += 0.5;
        } else {
            score -= 0.25;
        }
    });
    Object.keys(compareTo).forEach((year) => {
        if (!current[+year]) {
            score -= 0.25;
        }
    });
    return score;
};

/**
 * Check that the athletes share at least 1 year.
 */
const hasAnyOverlap = (
    current: Record<number, Level>,
    compareTo: Record<number, Level>
): boolean => {
    return Object.keys(current).some((year) => compareTo[+year]);
};

/**
 * Get the top N by score similarity, limited to those with at least 1 year in common.
 */
export const mostSimilarAthletes = (
    current: AthleteStats,
    topN = 10
): RelatedAthlete[] => {
    const withScore: RelatedAthlete[] = athleteStats
        .filter(
            (data) =>
                hasAnyOverlap(current.levelByYear, data.levelByYear) &&
                data.slug !== current.slug
        )
        .map((data) => {
            const similarity = overlapScore(
                current.levelByYear,
                data.levelByYear
            );
            return { slug: data.slug, similarity, data };
        });
    const sorted = orderBy(withScore, (o) => o.similarity, 'desc');
    return sorted.slice(0, topN);
};
