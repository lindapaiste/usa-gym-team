export type Level = 'Junior' | 'Senior';

export interface RowOriginal {
    firstName: string;
    lastName: string;
    level: string;
    club: string;
    year: number;
}

export interface Row extends RowOriginal {
    level: Level;
    fullName: string;
    athleteSlug: string;
    clubSlug: string;
}
