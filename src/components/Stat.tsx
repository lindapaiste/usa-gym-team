import type { ReactNode } from 'react';
import styles from './Stat.module.css';

interface StatProps {
    label: ReactNode;
    value: ReactNode;
}

export default function Stat({ label, value }: StatProps) {
    return (
        <div className={styles.container}>
            <div className={styles.value}>{value}</div>
            <div className={styles.label}>{label}</div>
        </div>
    );
}
