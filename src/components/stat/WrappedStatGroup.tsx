import { Grid } from '@mui/material';
import React from 'react';

/**
 * Multi-line stat group with a varying amount of elements.
 * Put a max of 3 per line.
 * If < 3, stretch to fill.
 * If > 3, do not stretch to fill on additional lines.
 */

interface Props {
    children: React.ReactElement[];
    statSize: Record<'xs' | 'sm' | 'md', number>;
}

function getWidth(count: number) {
    if (count === 1) return 12;
    if (count === 2) return 6;
    if (count === 3) return 4;
    if (count === 4) return 6;
    return 4;
}

export default function WrappedStatGroup({ children, statSize }: Props) {
    const count = React.Children.count(children);
    const width = getWidth(count);
    return (
        <Grid container spacing={3}>
            {React.Children.map(children, (child) => (
                <Grid
                    item
                    key={child.key}
                    xs={Math.max(width, statSize.xs)}
                    sm={Math.max(width, statSize.sm)}
                    md={Math.max(width, statSize.md)}
                    sx={{ '& > *': { height: '100%' }}}
                >
                    {child}
                </Grid>
            ))}
        </Grid>
    );
}
