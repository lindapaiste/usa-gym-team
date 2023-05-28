import type { Named } from '@/data/types';
import pageStyles from '@/styles/Page.module.css';
import { Signika_Negative } from '@next/font/google';
import clsx from 'clsx';
import { groupBy, sortBy } from 'lodash';
import Link from 'next/link';
import { ReactNode, useCallback, useMemo, useState } from 'react';
import styles from './AlphaIndex.module.css';

const font = Signika_Negative({ subsets: ['latin'] });

interface AlphaIndexProps<T extends Named> {
    baseUrl: string;
    items: T[];
    renderItem?: (item: T) => ReactNode;
    getName?: (item: T) => string;
}

const defaultGetName = (item: Named) => item.name;

const letters = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

export default function AlphaIndex<T extends Named>({
    baseUrl,
    items,
    renderItem,
    getName = defaultGetName,
}: AlphaIndexProps<T>) {
    const [search, setSearch] = useState('');
    const byLetter = useMemo(
        () => groupBy(items, (item) => getName(item).slice(0, 1).toUpperCase()),
        [items, getName]
    );
    const getFilteredItems = useCallback(
        (letter: string) => {
            const all = byLetter[letter] || [];
            const matching = search
                ? all.filter((item) =>
                      item.name.toLowerCase().includes(search.toLowerCase())
                  )
                : all;
            return sortBy(matching, getName);
        },
        [search, byLetter, getName]
    );

    return (
        <div>
            <ul className={styles.letters}>
                {letters.map((letter) => (
                    <li key={letter}>
                        <Link href={`#${letter}`}>{letter}</Link>
                    </li>
                ))}
            </ul>
            <div>
                <input
                    className={clsx(styles.search, font.className)}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="search"
                />
            </div>
            <div className={styles.content}>
                {letters.map((letter) => {
                    const items = getFilteredItems(letter);
                    // hide empty letters when searching.
                    if (search && items.length === 0) return null;
                    return (
                        <div
                            key={letter}
                            id={letter}
                            className={styles.letterSection}
                        >
                            <h3 className={styles.letterTitle}>{letter}</h3>
                            <ul className={clsx(styles.list, pageStyles.list)}>
                                {items.map((item) => (
                                    <li key={item.slug}>
                                        <Link href={`${baseUrl}${item.slug}`}>
                                            {(renderItem || getName)(item)}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
