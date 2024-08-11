import axios from "axios";
import { User } from "../Interfaces/User";


const serverUrl = 'http://localhost:4600/';


// login request
export async function login(user: User): Promise<User> {
    try {
        const result = await axios.post<User>(serverUrl + 'login', user, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return result.data;

    } catch (error: any) {
        const httpStatusCode = error.response.status
        throw httpStatusCode;
    }
}


// User Register request
export async function addNewUser(user: User): Promise<User> {
    try {
        const result = await axios.post<User>(serverUrl + 'register', user, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return result.data;

    } catch (error: any) {
        const errorText = error.response.data
        throw errorText;
    }
}