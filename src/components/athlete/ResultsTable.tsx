export interface EventResult {
    year: string;
    competition: string;
    city: string;
    division?: string;
    results: {
        rank: string;
        event: string;
        tie?: boolean;
    }[];
}

export default function ResultsTable({ results }: { results: EventResult[] }) {
    return (
        <table>
            <thead>
                <tr>
                    <td></td>
                    <td>Team</td>
                    <td>All-Around</td>
                    <td>Vault</td>
                    <td>Uneven Bars</td>
                    <td>Beam</td>
                    <td>Floor</td>
                </tr>
            </thead>
            <tbody>
                {results?.map((event) => {
                    // TODO: keyed.
                    const renderResult = (code: string) => {
                        const match = event.results.find(
                            (o) => o.event === code
                        );
                        if (!match) return;
                        return match.rank + (match.tie ? 'T' : '');
                    };
                    return (
                        <tr key={event.year + event.competition}>
                            <td>
                                {event.year} {event.competition}
                            </td>
                            {['Team', 'AA', 'VT', 'UB', 'BB', 'FX'].map(
                                (code) => (
                                    <td key={code}>{renderResult(code)}</td>
                                )
                            )}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
