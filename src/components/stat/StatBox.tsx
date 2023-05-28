import { styled, Theme } from '@mui/material';
import MaybeLink from '@/components/MaybeLink';

const StatBox = styled(MaybeLink)(({ theme }: { theme: Theme }) => ({
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: theme.palette.text.primary,
    background: theme.palette.background.paper,
    alignSelf: 'stretch',
    padding: '12px',
    transition: 'all 200ms',
    'a:hover&': {
        background: '#1b1b62', // TODO: put somewhere in theme
        transform: 'scale(1.1)'
    }
}));

export default StatBox;
