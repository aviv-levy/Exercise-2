export interface RegisterationUser {
    username: string;
    firstname: string;
    lastname: string;
    password: string;
    rePassword:string;
    isEditor?: boolean,
}