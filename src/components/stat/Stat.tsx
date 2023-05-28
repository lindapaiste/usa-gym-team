import StatBox from '@/components/stat/StatBox';
import { GridProps, Typography } from '@mui/material';
import type { ReactNode } from 'react';

/**
 * Basic stats for the top of a page.  Expect to be rendered inside a grid container.
 */

interface StatProps {
    label: ReactNode;
    value: ReactNode;
}

export default function Stat({ label, value, ...props }: StatProps & GridProps) {
    return (
        <StatBox {...props}>
            <Typography fontSize={30}>{value}</Typography>
            <Typography fontSize={11}>{label}</Typography>
        </StatBox>
    );
}
