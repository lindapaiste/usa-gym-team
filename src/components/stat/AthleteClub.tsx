import StatBox from '@/components/stat/StatBox';
import type { AthleteClubStats } from '@/data/types';
import { formatAsRange } from '@/data/yearUtil';
import { Typography } from '@mui/material';

// TODO: maybe don't show as continuous range if there is back and forth?
// ex. http://localhost:3000/athlete/kerri-strug

export default function AthleteClub({ club }: { club: AthleteClubStats }) {
    return (
        <StatBox href={`/club/${club.slug}`}>
            <Typography fontSize={24}>{club.name}</Typography>
            <Typography fontSize={13}>
                {club.yearCount} Year{club.yearCount > 1 ? 's' : ''}
            </Typography>
            <Typography fontSize={11}>{formatAsRange(club)}</Typography>
        </StatBox>
    );
}

