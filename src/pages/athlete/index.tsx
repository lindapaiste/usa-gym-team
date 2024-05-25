import AlphaIndex from '@/components/AlphaIndex';
import { athleteStats } from '@/data/athleteStats';
import type { AthleteStats, Named } from '@/data/types';
import styles from '@/styles/Page.module.css';
import type { GetStaticProps } from 'next';

interface Props {
    data: Named[];
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
                renderItem={o => o.name}
            />
        </div>
    );
}

export const getStaticProps: GetStaticProps<Props> = () => ({
    props: {
        data: athleteStats.map(o => ({
            name: getName(o),
            slug: o.slug
        })),
    },
});
