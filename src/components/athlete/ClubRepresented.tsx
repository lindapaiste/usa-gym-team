import type { AthleteClub, Level } from '@/data/types';
import { formatAsRange } from '@/data/yearUtil';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import styles from '../Stat.module.css';

// TODO: maybe don't show as continuous range if there is back and forth?
// ex. http://localhost:3000/athlete/kerri-strug

export default function ClubRepresented({ club }: { club: AthleteClub }) {
    return (
        <Link href={`/club/${club.slug}`}>
            <Box className={styles.container}>
                <Typography fontSize={24}>{club.name}</Typography>
                <Typography fontSize={13}>
                    {club.yearCount} Year{club.yearCount > 1 ? 's' : ''}
                </Typography>
                <Typography fontSize={11}>{formatAsRange(club)}</Typography>
            </Box>
        </Link>
    );
}

export function AthleteTeam({ year, level }: { year: number; level: Level }) {
    return (
        <Link href={`/team/${year}`}>
            <Box className={styles.container}>
                <Typography fontSize={30}>{year}</Typography>
                <Typography fontSize={15}>{level}</Typography>
                <Typography fontSize={11}>
                    {year} - {year + 1} season
                </Typography>
            </Box>
        </Link>
    );
}
