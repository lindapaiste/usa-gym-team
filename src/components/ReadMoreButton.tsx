import Link from 'next/link';
import { IoChevronForward } from 'react-icons/io5';
import styles from './ReadMoreButton.module.css';

interface Props {
    href: string;
    children: string;
}

export default function ReadMoreButton({ href, children }: Props) {
    return (
        <div className={styles.alignRight}>
            <Link href={href} className={styles.button}>
                {children}
                <IoChevronForward />
            </Link>
        </div>
    );
}
