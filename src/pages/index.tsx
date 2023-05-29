import { athleteStats } from '@/data/athleteStats';
import { clubStats, ClubStats } from '@/data/clubStats';
import { AthleteStats, Named } from '@/data/types';
import { Box, Container, Grid, styled, Typography } from '@mui/material';
import { groupBy, reverse, round, sortBy, uniq } from 'lodash';
import Head from 'next/head';
import Link from 'next/link';

const n = 10; // TODO - make this a variable

const List = styled('ul')({
    listStyleType: 'none',
    paddingLeft: 16,
    '& a:hover': {
        textDecoration: 'underline',
    },
});

const Count = ({ value, units }: { value: number; units: string }) => (
    <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        alignSelf="flex-start"
        sx={{
            justifyContent: 'center',
            width: 50,
            height: 50,
            borderRadius: '8px',
            background: (theme) => theme.palette.background.paper,
        }}
    >
        <Typography fontSize={30} lineHeight={1}>
            {value}
        </Typography>
        <Typography fontSize={11} lineHeight={1}>
            {units}
        </Typography>
    </Box>
);

interface TopGroup<T> {
    items: T[];
    value: number;
}

function pickTop<T extends object>(
    candidates: T[],
    getStat: (object: T) => number,
    n = 10
) {
    const withStat = candidates.map((o) => ({ ...o, stat: getStat(o) }));
    const values = reverse(sortBy(uniq(withStat.map((o) => o.stat))));
    const grouped = groupBy(withStat, 'stat'); // TODO: create a distribution

    let count = 0;
    const topGroups: TopGroup<T>[] = [];

    for (let i = 0; i < values.length; i++) {
        const value = values[i];
        const items = grouped[value] ?? [];
        // Is it closer to the desired with or without adding?
        const needed = n - count;
        if (needed > items.length * 0.5 || count === 0) {
            topGroups.push({ value, items });
        }
        count += items.length;
        if (count >= n) {
            break;
        }
    }

    return topGroups;
}

function RenderTopList({
    title,
    topGroups,
    units,
    urlBase,
}: {
    title: string;
    topGroups: TopGroup<Named>[];
    units: string;
    urlBase: string;
}) {
    return (
        <Grid item xs={12} sm={6} md={4}>
            <h3>{title}</h3>
            {topGroups.map(({ value, items }) => (
                <Box key={value} display="flex" my={1.5}>
                    <Count key={value} value={value} units={units} />
                    <List>
                        {items.map((item) => (
                            <li key={item.slug}>
                                <Link href={`${urlBase}${item.slug}`}>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </List>
                </Box>
            ))}
        </Grid>
    );
}

function TopAthletes({
    title,
    getStat,
}: {
    title: string;
    getStat: (data: AthleteStats) => number;
}) {
    return (
        <RenderTopList
            title={title}
            topGroups={pickTop(athleteStats, getStat, n)}
            units="Years"
            urlBase="/athlete/"
        />
    );
}

function TopClubs({
    title,
    getStat,
    units,
}: {
    title: string;
    getStat: (data: ClubStats) => number;
    units: string;
}) {
    return (
        <RenderTopList
            title={title}
            topGroups={pickTop(clubStats, getStat, n)}
            units={units}
            urlBase="/club/"
        />
    );
}

export default function Home() {
    return (
        <>
            <Head>
                <title>USA Women&apos;s Gymnastics Team Stats</title>
            </Head>
            <Container maxWidth="md" component="main">
                <Grid container my={3} spacing={3}>
                    <TopAthletes
                        title="Most Total Years on Team"
                        getStat={(a) => a.total.yearCount}
                    />
                    <TopAthletes
                        title="Most Years on Senior Team"
                        getStat={(a) => a.senior?.yearCount || 0}
                    />
                    <TopAthletes
                        title="Most Years on Junior Team"
                        getStat={(a) => a.junior?.yearCount || 0}
                    />
                    <TopAthletes
                        title="Most Consecutive Years on Team"
                        getStat={(a) => a.total.longestStreak?.yearCount || 0}
                    />
                    <TopAthletes
                        title="Longest Career Span"
                        getStat={(a) => 1 + a.total.end - a.total.start}
                    />
                    <TopAthletes
                        title="Child Prodigies"
                        getStat={(a) =>
                            (a.junior?.yearCount || 0) -
                            (a.senior?.yearCount || 0)
                        }
                    />
                </Grid>
                <hr />
                <Grid container my={3} spacing={3}>
                    <TopClubs
                        title="Most Athlete-Years"
                        getStat={(c) => c.totalAthleteYears}
                        units="Years"
                    />
                    <TopClubs
                        title="Most Years Represented"
                        getStat={(c) => c.yearsRepresented}
                        units="Years"
                    />
                    <TopClubs
                        title="Most Athletes"
                        getStat={(c) => c.countDistinctAthletes}
                        units="Athletes"
                    />
                    <TopClubs
                        title="Highest Average Years Per Athlete"
                        getStat={(c) => round(c.avgYearsPerAthlete, 1)}
                        units="Years"
                    />
                    <TopClubs
                        title="Most Athletes at Once"
                        getStat={(c) => c.mostConcurrentAthletes}
                        units="Athletes"
                    />
                </Grid>
            </Container>
        </>
    );
}
