export interface User {
    id: string;
    firstname: string;
    lastname: string;
    token?: string;
    isEditor: boolean,
    isAdmin: boolean;
}