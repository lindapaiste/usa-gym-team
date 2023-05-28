import { Colors } from '@/components/colors';
import { teamMinYear, teamYearsCount } from '@/data/teamStats';
import { round } from 'lodash';

const eachYearPercent = 100 / teamYearsCount;
const percent = (years: number): string =>
    `${round(years * eachYearPercent, 2)}%`;
export const left = (year: number): string => percent(year - teamMinYear);

/**
 * Group of bars for a junior or senior career.
 */
function GanttBars({
    clusters,
    color,
}: {
    clusters: number[][];
    color: string;
}) {
    return (
        <>
            {clusters.map((years) => (
                <div
                    key={years[0]}
                    style={{
                        position: 'absolute',
                        top: 5,
                        bottom: 5,
                        left: percent(years[0] - teamMinYear),
                        width: percent(years.length),
                        background: color,
                    }}
                />
            ))}
        </>
    );
}

export default function GanttRow({
    junior = [],
    senior = [],
}: {
    junior?: number[][];
    senior?: number[][];
}) {
    return (
        <div style={{ width: '100%', height: 30, position: 'relative' }}>
            <GanttBars clusters={junior} color={Colors.junior} />
            <GanttBars clusters={senior} color={Colors.senior} />
        </div>
    );
}
