import AlphaIndex from '@/components/AlphaIndex';
import { clubStats, ClubStats } from '@/data/clubStats';
import type { GetStaticProps } from 'next';
import styles from '@/styles/Page.module.css';

interface Props {
    data: ClubStats[];
}

export default function ClubIndex({ data }: Props) {
    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>Gymnastics Clubs</h1>
            <AlphaIndex
                baseUrl="/club/"
                items={data}
                renderItem={(o) => o.name}
            />
        </div>
    );
}

// TODO: minimize to just essential stats.

export const getStaticProps: GetStaticProps<Props> = () => ({
    props: {
        data: clubStats,
    },
});
