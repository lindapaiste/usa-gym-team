import { Stack } from '@mui/material';
import { ReactNode } from 'react';

export default function StatRow({ children }: { children: ReactNode }) {
    return (
        <Stack direction="row" spacing={3} my={3} sx={{ '& > *': { flex: 1 } }}>
            {children}
        </Stack>
    );
}
