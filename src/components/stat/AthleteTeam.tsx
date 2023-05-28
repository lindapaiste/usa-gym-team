import StatBox from '@/components/stat/StatBox';
import { Level } from '@/data/source/types';
import { Typography } from '@mui/material';

export function AthleteTeam({ year, level }: { year: number; level: Level }) {
    return (
        <StatBox href={`/team/${year}`}>
            <Typography fontSize={30}>{year}</Typography>
            <Typography fontSize={15}>{level}</Typography>
            <Typography fontSize={11}>
                {year} - {year + 1} season
            </Typography>
        </StatBox>
    );
}
