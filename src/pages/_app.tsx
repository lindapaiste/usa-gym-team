import '@/styles/globals.css';
import Header from '@/components/Header';
import { createTheme, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';

import { Signika_Negative } from '@next/font/google';

const font = Signika_Negative({ subsets: ['latin'] });

const theme = createTheme({
    typography: {
        fontFamily: 'inherit',
    },
    palette: {
        mode: 'dark',
        background: {
            // default: '',
            paper: '#10103c',
        },
    },
});

// TODO: want <header> outside <main>
export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <main className={font.className}>
                <Header />
                <Component {...pageProps} />
            </main>
        </ThemeProvider>
    );
}
