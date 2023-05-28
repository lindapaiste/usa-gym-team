import GanttRow from '@/components/gantt/GanttRow';
import { AthleteStats } from '@/data/types';
import { formatYearClusters } from '@/data/yearUtil';
import Link from 'next/link';
import styles from './Gantt.module.css';

export interface LabeledRowProps {
    athlete: AthleteStats;
    showYears?: boolean;
    disableLink?: boolean;
}

export default function LabeledRow({
    athlete,
    showYears,
    disableLink,
}: LabeledRowProps) {
    return (
        <div className={styles.labeledRow}>
            <div className={styles.rowLabel}>
                {disableLink ? (
                    <span className={styles.labelMain}>{athlete.name}</span>
                ) : (
                    <Link
                        href={`/athlete/${athlete.slug}`}
                        className={styles.labelMain}
                    >
                        {athlete.name}
                    </Link>
                )}
                {showYears ? (
                    <div className={styles.labelSub}>
                        {formatYearClusters(athlete.total.clusters)}
                    </div>
                ) : null}
            </div>
            <div className={styles.rowBody}>
                <GanttRow
                    junior={athlete.junior?.clusters}
                    senior={athlete.senior?.clusters}
                />
            </div>
        </div>
    );
}
