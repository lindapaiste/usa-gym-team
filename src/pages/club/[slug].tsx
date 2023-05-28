import ClubHistogram from '@/components/histogram/ClubHistogram';
import LabeledRow from '@/components/gantt/LabeledRow';
import Stat from '@/components/Stat';
import { clubSlugs, ClubStats, getClubStats } from '@/data/clubStats';
import { formatYearClusters } from '@/data/yearUtil';
import { createGetStaticPaths, createGetStaticProps } from '@/util/nextUtil';
import { orderBy, sortBy } from 'lodash';
import styles from '@/styles/Page.module.css';

interface Props {
    data: ClubStats;
}

export default function ClubPage({ data }: Props) {
    const timelineData = orderBy(
        Object.values(data.yearsByAthlete),
        [(o) => o.total.start, (o) => o.total.yearCount],
        ['asc', 'asc']
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>{data.name}</h1>
            <div className={styles.statGroup}>
                <Stat
                    label="Years on Team"
                    value={formatYearClusters(data.years.clusters)}
                />
            </div>
            <div className={styles.statGroup}>
                <Stat label="Total Years" value={data.yearsRepresented} />
                <Stat
                    label="Total Athletes"
                    value={data.countDistinctAthletes}
                />
                <Stat label="Athlete Years" value={data.totalAthleteYears} />
            </div>
            <h2>Representation</h2>
            <ClubHistogram {...data} />
            <h2>Timeline</h2>
            <div>
                {timelineData.map((athlete) => (
                    <LabeledRow athlete={athlete} key={athlete.slug} />
                ))}
            </div>
            <h2>Athletes</h2>
            {data.years.years.map((year) => (
                <div key={year}>
                    <h3>{year}</h3>
                    <ul className={styles.list}>
                        {sortBy(
                            data.athletesByYear[year].total,
                            (a) => a.lastName
                        ).map((athlete) => (
                            <li key={athlete.athleteSlug}>
                                {athlete.fullName} ({athlete.level})
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export const getStaticPaths = createGetStaticPaths(clubSlugs);

export const getStaticProps = createGetStaticProps<Props>((slug) => ({
    data: getClubStats(slug),
}));
