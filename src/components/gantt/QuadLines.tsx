import { teamMaxYear, teamMinYear, teamYearsCount } from '@/data/teamStats';
import { range, round } from 'lodash';
import { ReactNode } from 'react';
import styles from './Gantt.module.css';

// TODO: needs to account for name width

const eachYearPercent = 80 / teamYearsCount;
const percent = (years: number): string =>
    `${round(20 + years * eachYearPercent, 2)}%`;
export const left = (year: number): string => percent(year - teamMinYear);

export default function QuadLines({ children }: { children: ReactNode }) {
    return (
        <div className={styles.chart}>
            {range(teamMinYear, teamMaxYear + 1)
                .filter((year) => year % 4 === 0)
                .map((year) => (
                    <div
                        key={year}
                        className={styles.quadLine}
                        style={{ left: left(year) }}
                    />
                ))}
            {children}
        </div>
    );
}
