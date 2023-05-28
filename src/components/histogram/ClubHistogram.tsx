import { Colors } from '@/components/colors';
import { ClubStats } from '@/data/clubStats';
import type { ByLevel, Row } from '@/data/types';
import * as d3 from 'd3';
import { last, mapValues, range } from 'lodash';
import { useState } from 'react';
import styles from './Histogram.module.css';

type Counts = Record<number, { junior: number; senior: number }>;

function Tooltip({
    year,
    athletes,
}: {
    year: number;
    athletes: ByLevel<Row[]>;
}) {
    const { junior = [], senior = [] } = athletes || {};
    return (
        <div className={styles.tooltip}>
            <h4>{year}</h4>
            <h5>{junior.length} Juniors</h5>
            <ul>
                {junior.map((row) => (
                    <li key={row.athleteSlug}>{row.fullName}</li>
                ))}
            </ul>
            <h5>{senior.length} Seniors</h5>
            <ul>
                {senior.map((row) => (
                    <li key={row.athleteSlug}>{row.fullName}</li>
                ))}
            </ul>
        </div>
    );
}

// TODO: y-scale
export default function ClubHistogram({
    athletesByYear,
    mostConcurrentAthletes,
    years,
}: ClubStats) {
    const counts: Counts = mapValues(athletesByYear, (data) => ({
        junior: data.junior.length,
        senior: data.senior.length,
    }));
    const start = years.years[0];
    const end = last(years.years)!;

    const yearScale = d3
        .scaleBand<number>()
        .domain([start, end])
        .padding(0.2)
        .rangeRound([0, 400]);

    const [year, setYear] = useState<number | null>(null);

    return (
        <>
            <div className={styles.histogram}>
                {range(start, end + 1).map((year) => {
                    const { junior = 0, senior = 0 } = counts[year] || {};
                    return (
                        <div
                            key={year}
                            className={styles.barContainer}
                            onMouseEnter={() => setYear(year)}
                            onMouseLeave={() =>
                                setYear((prev) => (prev === year ? null : prev))
                            }
                            // TODO: onTouch
                        >
                            <div
                                style={{
                                    height: 30 * junior,
                                    background: Colors.junior,
                                }}
                            />
                            <div
                                style={{
                                    height: 30 * senior,
                                    background: Colors.senior,
                                }}
                            />
                            <div className={styles.tickContainer}>
                                {year % 4 === 0 ? (
                                    <>
                                        <div className={styles.tickLine} />
                                        <div className={styles.tickLabel}>
                                            {year}
                                        </div>
                                    </>
                                ) : null}
                            </div>
                        </div>
                    );
                })}
                {year ? (
                    <Tooltip year={year} athletes={athletesByYear[year]} />
                ) : null}
            </div>
        </>
    );
}
