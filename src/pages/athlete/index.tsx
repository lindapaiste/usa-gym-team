import AlphaIndex from '@/components/AlphaIndex';
import { athleteStats } from '@/data/athleteStats';
import { AthleteStats } from '@/data/types';
import styles from '@/styles/Page.module.css';
import type { GetStaticProps } from 'next';

interface Props {
    data: AthleteStats[];
}

function getName(athlete: AthleteStats) {
    return `${athlete.lastName}, ${athlete.firstName}`;
}

export default function AthleteIndex({ data }: Props) {
    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>Athletes</h1>
            <AlphaIndex
                baseUrl="/athlete/"
                items={data}
                renderItem={getName}
                getName={getName}
            />
        </div>
    );
}

// TODO: minimize to just essential stats.

export const getStaticProps: GetStaticProps<Props> = () => ({
    props: {
        data: athleteStats,
    },
});
