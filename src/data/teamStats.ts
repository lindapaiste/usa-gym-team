import * as d3 from 'd3';
import { groupBy, mapValues, orderBy, uniq } from 'lodash';
import { getAthleteStats } from './athleteStats';
import { rows } from './source';
import { PersonYears, TeamStats } from './types';
import { alphaSort, separateJuniorSenior } from './util';

export const [teamMinYear, teamMaxYear] = d3.extent(rows, (r) => r.year) as [
    number,
    number
];
export const teamYearsCount = teamMaxYear - teamMinYear + 1;
export const teamYears = orderBy(uniq(rows.map((r) => r.year)));

const rowsByYear = groupBy(rows, (r) => r.year);

const teamsByYear = mapValues(rowsByYear, (rows) => {
    const { junior, senior, total } = separateJuniorSenior(rows);
    return {
        year: rows[0].year,
        total: alphaSort(total),
        junior: alphaSort(junior),
        senior: alphaSort(senior),
    };
});

export const getYearTeam = (year: number | string): TeamStats =>
    teamsByYear[+year];

export const personYears = (slug: string, current: number): PersonYears => {
    const person = getAthleteStats(slug);
    const years = person.total.years;
    let yearsPrevious = 0;
    let yearsFuture = 0;
    years.forEach((year) => {
        if (year < current) {
            yearsPrevious++;
        } else if (year > current) {
            yearsFuture++;
        }
    });
    return {
        name: person.name,
        slug,
        yearsPrevious,
        yearsFuture,
    };
};
