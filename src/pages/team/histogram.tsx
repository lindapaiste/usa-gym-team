import LabeledRow from '@/components/gantt/LabeledRow';
import QuadLines from '@/components/gantt/QuadLines';
import { athleteStats } from '@/data/athleteStats';
import { AthleteStats } from '@/data/types';
import { orderBy } from 'lodash';
import { GetStaticProps } from 'next';

interface Props {
    athletes: AthleteStats[];
}

export default function TeamPage({ athletes }: Props) {
    return (
        <QuadLines>
            {athletes.map((athlete) => (
                <LabeledRow athlete={athlete} key={athlete.slug} />
            ))}
        </QuadLines>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    // Order by first year then by total years.
    const athletes = orderBy(
        athleteStats,
        [(o) => o.total.start, (o) => o.total.yearCount],
        ['asc', 'asc']
    );
    return {
        props: {
            athletes,
        },
    };
};
