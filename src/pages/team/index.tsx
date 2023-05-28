import ReadMoreButton from '@/components/ReadMoreButton';
import { getYearTeam, teamYears } from '@/data/teamStats';
import { TeamStats } from '@/data/types';
import { Lineup } from '@/pages/team/[slug]';
import styles from '@/styles/Page.module.css';
import { reverse } from 'lodash';
import { GetStaticProps } from 'next';
import Link from 'next/link';

interface Props {
    teams: TeamStats[];
}

// TODO: number links on top like on athlete list

export default function TeamPage({ teams }: Props) {
    return (
        <div className={styles.container}>
            {teams.map(({ year, junior, senior }) => (
                <div key={year}>
                    <div className={styles.withSub}>
                        <h2 className={styles.pageTitle}>
                            <Link href={`/team/${year}`}>
                                {year} National Team
                            </Link>
                        </h2>
                        <div>
                            for the {year} - {year + 1} season
                        </div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                        }}
                    >
                        <div>
                            <h2>Seniors</h2>
                            <Lineup data={senior ?? []} />
                        </div>
                        <div>
                            <h2>Juniors</h2>
                            <Lineup data={junior ?? []} />
                        </div>
                    </div>
                    <ReadMoreButton href={`/team/${year}`}>
                        Team Stats
                    </ReadMoreButton>
                </div>
            ))}
        </div>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const teams = reverse(teamYears).map(getYearTeam);
    return {
        props: {
            teams,
        },
    };
};
