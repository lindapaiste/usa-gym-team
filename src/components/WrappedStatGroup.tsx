import { clamp } from 'lodash';
import React from 'react';
import { Box } from '@mui/material';

/**
 * Multi-line stat group with a varying amount of elements.
 * Put a max of 3 per line.
 * If < 3, stretch to fill.
 * If > 3, do not stretch to fill on additional lines.
 */

interface Props {
  children: React.ReactElement[];
}

function getWidth(count: number) {
  if (count === 1) return 1;
  if (count === 2) return 0.5;
  if (count === 3) return 0.333;
  if (count === 4) return 0.5;
  return 0.333;
}

function percent(ratio: number) {
  return `${100 * ratio}%`;
}

export default function WrappedStatGroup({ children }: Props) {
  const count = React.Children.count(children);
  const width = getWidth(count);
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'stretch',
        '& > *': {
          xs: { width: '100%' },
          sm: { width: percent(clamp(width, 0.5, 1)) },
          md: { width: percent(width) }
        },
        '& > a > div': {
          // TODO: make this cleaner -- depends on the margin of the stat container
          height: 'calc(100% - 24px)'
        }
      }}
    >
      {children}
    </Box>
  );
}
