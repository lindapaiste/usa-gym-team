import Stat from '@/components/Stat';
import type { Named } from '@/data/types';
import styles from '@/styles/Page.module.css';
import {
    Box,
    Button,
    List,
    ListItem,
    ListItemText,
    Typography,
} from '@mui/material';
import { orderBy } from 'lodash';
import Link from 'next/link';
import { ReactNode, useState } from 'react';

/**
 * Show top n as big tiles, but can expand to show all.
 */

interface Props<T extends Named> {
    athletes: T[];
    getStat: (athlete: T) => number;
    renderSub: (stat: number, athlete: T) => ReactNode;
    topN?: number;
}

// TODO: style stats (box height, responsive, font size)
// TODO: list padding
// TODO: list numbers

export default function CallOutList<T extends Named>({
    athletes,
    getStat,
    renderSub,
    topN = 3,
}: Props<T>) {
    const withStat = athletes.map((athlete) => ({
        ...athlete,
        stat: getStat(athlete),
    }));
    const sorted = orderBy(withStat, ['stat', 'name'], ['desc', 'asc']);

    const hasMore = athletes.length > topN;
    const [isExpanded, setIsExpanded] = useState(false);

    // TODO: hide the whole section??
    if (athletes.length === 0) {
        return (
            <Typography sx={{ opacity: 0.6, textAlign: 'center' }}>
                none
            </Typography>
        );
    }

    return (
        <>
            <Box className={styles.statGroup} sx={{ '& > *': { flex: 1 } }}>
                {sorted.slice(0, topN).map((athlete) => (
                    <Link key={athlete.slug} href={`/athlete/${athlete.slug}`}>
                        <Stat
                            label={renderSub(athlete.stat, athlete)}
                            value={athlete.name}
                        />
                    </Link>
                ))}
            </Box>
            {hasMore ? (
                <Box display="flex" justifyContent="flex-end">
                    <Button onClick={() => setIsExpanded((prev) => !prev)}>
                        {isExpanded ? 'Hide' : 'Show More'}
                    </Button>
                </Box>
            ) : null}
            {isExpanded ? (
                <ol>
                    <List>
                        {sorted.map((athlete) => (
                            <ListItem key={athlete.slug}>
                                <Link href={`/athlete/${athlete.slug}`}>
                                    <ListItemText
                                        primary={athlete.name}
                                        secondary={renderSub(
                                            athlete.stat,
                                            athlete
                                        )}
                                    />
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                </ol>
            ) : null}
        </>
    );
}
