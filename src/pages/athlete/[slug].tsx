import ClubRepresented, { AthleteTeam } from '@/components/athlete/ClubRepresented';
import ResultsTable from '@/components/athlete/ResultsTable';
import gaantStyles from '@/components/gantt/Gantt.module.css';
import LabeledRow from '@/components/gantt/LabeledRow';
import Stat from '@/components/Stat';
import WrappedStatGroup from '@/components/WrappedStatGroup';
import { athleteSlugs, getAthleteStats } from '@/data/athleteStats';
import { mostSimilarAthletes } from '@/data/overlapScore';
import { AthleteClub, DetailedAthleteStats, RelatedAthlete } from '@/data/types';
import { formatYearClusters } from '@/data/yearUtil';
import styles from '@/styles/Page.module.css';
import { createGetStaticPaths, createGetStaticProps } from '@/util/nextUtil';
import { sortBy } from 'lodash';

// TODO: lauren hernandez has same year twice.  others?
// trinity thomas 2017 twice
// kim zmeskal missing 92

interface Props {
    data: DetailedAthleteStats;
    related: RelatedAthlete[];
}

function ClubsSection({ clubs }: { clubs: AthleteClub[] }) {
    return (
        <WrappedStatGroup>
            {sortBy(clubs, (club) => club.start).map((club) => (
                <ClubRepresented club={club} key={club.slug} />
            ))}
        </WrappedStatGroup>
    );
}

export default function AthletePage({ data, related = [] }: Props) {
    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>{data.name}</h1>
            <div className={styles.statGroup}>
                <Stat
                    label="Years on Team"
                    value={formatYearClusters(data.total.clusters)}
                />
            </div>
            <div className={styles.statGroup}>
                <Stat label="Total Years" value={data.total.yearCount} />
                <Stat
                    label="Years Junior"
                    value={data.junior?.yearCount ?? 0}
                />
                <Stat
                    label="Years Senior"
                    value={data.senior?.yearCount ?? 0}
                />
            </div>
            <h3>Similar Careers</h3>
            <div className={gaantStyles.rowHighlight}>
                <LabeledRow athlete={data} disableLink showYears />
            </div>
            <div>
                {related.map((athlete) => (
                    <LabeledRow
                        athlete={athlete.data}
                        key={athlete.slug}
                        showYears
                    />
                ))}
            </div>
            <h3>Clubs Represented</h3>
            <ClubsSection clubs={data.clubs} />
            <h3>National Teams</h3>
            <WrappedStatGroup>
                {data.total.years?.map((year) => (
                    <AthleteTeam
                        key={year}
                        year={year}
                        level={data.levelByYear[year]}
                    />
                ))}
            </WrappedStatGroup>
            {data.results ? (
                <>
                    <h3>Results</h3>
                    <ResultsTable results={data.results} />
                </>
            ) : null}
        </div>
    );
}

export const getStaticPaths = createGetStaticPaths(athleteSlugs);

export const getStaticProps = createGetStaticProps<Props>((slug) => {
    const data = getAthleteStats(slug);
    const related = mostSimilarAthletes(data, 10);
    return {
        data,
        related,
    };
});
