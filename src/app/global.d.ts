declare module 'DTO' {
    export interface SendQuestion {
        questions: string[];
        name: string;
        domains: string[];
        email: string;
    }
}