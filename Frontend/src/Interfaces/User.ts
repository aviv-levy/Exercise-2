export interface User {
    id?: string;
    firstname: string;
    lastname: string;
    password: string;
    // img?: string,
    // img_alt?: string,
    token?: string;
    isEditor?: boolean,
    isAdmin?: boolean;
    // cartProducts?: Array<ProductQuantity>;
}