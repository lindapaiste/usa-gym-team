import AlphaIndex from '@/components/AlphaIndex';
import { clubStats } from '@/data/clubStats';
import type { Named } from '@/data/types';
import type { GetStaticProps } from 'next';
import styles from '@/styles/Page.module.css';

interface Props {
    data: Named[];
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

export const getStaticProps: GetStaticProps<Props> = () => ({
    props: {
        data: clubStats.map(o => ({ name: o.name, slug: o.slug })),
    },
});
