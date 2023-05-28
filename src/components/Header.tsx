import styles from './Header.module.css';
import Link from 'next/link';

export default function Header() {
    return (
        <header className={styles.container}>
            <h2 className={styles.title}>
                <Link href="/">USA Women&apos;s Gymnastics Team Stats</Link>
            </h2>
            <div className={styles.menu}>
                <Link href="/team">Teams</Link>
                <Link href="/athlete">Athletes</Link>
                <Link href="/club">Clubs</Link>
            </div>
        </header>
    );
}
