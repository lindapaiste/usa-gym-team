import CallOutList from '@/components/athlete/CallOutList';
import LabeledRow from '@/components/gantt/LabeledRow';
import Stat from '@/components/Stat';
import { getAthleteStats } from '@/data/athleteStats';
import { Row } from '@/data/source/types';
import {
    getYearTeam,
    personYears,
    teamMaxYear,
    teamMinYear,
    teamYears,
} from '@/data/teamStats';
import { TeamStats } from '@/data/types';
import styles from '@/styles/Page.module.css';
import { orderBy, partition, sortBy, sumBy } from 'lodash';
import Link from 'next/link';
import { createGetStaticPaths, createGetStaticProps } from '@/util/nextUtil';

interface Props {
    data: TeamStats;
}

export function Lineup({ data }: { data: Row[] }) {
    const sorted = orderBy(
        data,
        [(o) => o.lastName, (o) => o.firstName],
        ['asc', 'asc']
    );
    return (
        <ol>
            {sorted.map((o) => (
                <li key={o.athleteSlug}>
                    <Link href={`/athlete/${o.athleteSlug}`}>{o.fullName}</Link>
                </li>
            ))}
        </ol>
    );
}

export default function YearTeamPage({ data }: Props) {
    const { junior = [], senior = [], total, year } = data;
    const athletes = total.map((row) => getAthleteStats(row.athleteSlug));
    const past = athletes.map((a) => ({
        slug: a.slug,
        name: a.name,
        count: a.total.years.filter((y) => y < year).length,
    }));
    const peopleYears = total.map((row) => personYears(row.athleteSlug, year));
    const [rookies, veterans] = partition(
        peopleYears,
        (o) => o.yearsPrevious === 0
    );
    const futureYears = sumBy(peopleYears, (o) => o.yearsFuture);
    const pastYears = sumBy(peopleYears, (o) => o.yearsPrevious);
    // TODO: alphaSort rookies
    return (
        <div className={styles.container}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {year - 1 >= teamMinYear ? (
                    <Link href={`/team/${year - 1}`}>
                        {'<'}
                        {year - 1}
                    </Link>
                ) : (
                    <div />
                )}
                {year + 1 <= teamMaxYear ? (
                    <Link href={`/team/${year + 1}`}>
                        {year + 1}
                        {'>'}
                    </Link>
                ) : (
                    <div />
                )}
            </div>
            <div className={styles.withSub}>
                <h1 className={styles.pageTitle}>{year} National Team</h1>
                <div>
                    for the {year} - {year + 1} season
                </div>
            </div>
            <div className={styles.statGroup}>
                <Stat label="Years of Past Experience" value={pastYears} />
                <Stat label="Years of Future Experience" value={futureYears} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <div>
                    <h2>Seniors</h2>
                    <Lineup data={senior ?? []} />
                </div>
                <div>
                    <h2>Juniors</h2>
                    <Lineup data={junior ?? []} />
                </div>
            </div>
            <h3>Rookies</h3>
            <h4>First-Time Athletes</h4>
            <CallOutList
                athletes={rookies}
                getStat={(o) => o.yearsFuture}
                renderSub={(stat) => `${stat} Future Teams`}
            />
            <h3>Veterans</h3>
            <h4>Most Previous Years on Team</h4>
            <CallOutList
                athletes={veterans}
                getStat={(o) => o.yearsPrevious}
                renderSub={(stat) => `${stat} Previous Teams`}
            />
            <h3>Retirees</h3>
            <h4>Last Team Appearance</h4>
            <CallOutList
                athletes={peopleYears.filter((o) => o.yearsFuture === 0)}
                getStat={(o) => o.yearsPrevious}
                renderSub={(stat) => `${stat} Previous Teams`}
            />
            <h3>Career Timeline</h3>
            {sortBy(athletes, (a) => a.total.start).map((a) => (
                <LabeledRow athlete={a} key={a.slug} />
            ))}
        </div>
    );
}

export const getStaticPaths = createGetStaticPaths(
    teamYears.map((year) => year.toString())
);

export const getStaticProps = createGetStaticProps<Props>((slug) => ({
    data: getYearTeam(slug),
}));
