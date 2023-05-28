import AthleteClub from '@/components/stat/AthleteClub';
import gaantStyles from '@/components/gantt/Gantt.module.css';
import LabeledRow from '@/components/gantt/LabeledRow';
import { AthleteTeam } from '@/components/stat/AthleteTeam';
import Stat from '@/components/stat/Stat';
import StatRow from '@/components/stat/StatRow';
import WrappedStatGroup from '@/components/stat/WrappedStatGroup';
import { athleteSlugs, getAthleteStats } from '@/data/athleteStats';
import { mostSimilarAthletes } from '@/data/overlapScore';
import { AthleteClubStats, DetailedAthleteStats, RelatedAthlete } from '@/data/types';
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

function ClubsSection({ clubs }: { clubs: AthleteClubStats[] }) {
    return (
        <WrappedStatGroup statSize={{ xs: 12, sm: 6, md: 4 }}>
            {sortBy(clubs, (club) => club.start).map((club) => (
                <AthleteClub club={club} key={club.slug} />
            ))}
        </WrappedStatGroup>
    );
}

export default function AthletePage({ data, related = [] }: Props) {
    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>{data.name}</h1>
            <StatRow>
                <Stat
                    label="Years on Team"
                    value={formatYearClusters(data.total.clusters)}
                />
            </StatRow>
            <StatRow>
                <Stat label="Total Years" value={data.total.yearCount} />
                <Stat
                    label="Years Junior"
                    value={data.junior?.yearCount ?? 0}
                />
                <Stat
                    label="Years Senior"
                    value={data.senior?.yearCount ?? 0}
                />
            </StatRow>
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
            <WrappedStatGroup statSize={{ xs: 6, sm: 4, md: 4 }}>
                {data.total.years?.map((year) => (
                    <AthleteTeam
                        key={year}
                        year={year}
                        level={data.levelByYear[year]}
                    />
                ))}
            </WrappedStatGroup>
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
