export interface User {
    id: number;
    firstname: string;
    lastname: string;
    token?: string;
    isEditor: boolean,
}