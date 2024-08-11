import axios from "axios";
import { User } from "../Interfaces/User";
import { LoginUser } from "../Interfaces/LoginUser";
import { RegisterationUser } from "../Interfaces/RegisterationUser";
import { getToken } from "../Auth/TokenManager";


const serverUrl = 'http://localhost:4600/';


// login request, return user data
export async function login(user: LoginUser): Promise<User> {
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

// Get all data about logged in user.
export async function getUserDetails(): Promise<User> {
    try {
        const result = await axios.get<User>(serverUrl + 'user', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
        })

        return result.data;

    } catch (error: any) {
        const httpStatusCode = error.response.status
        throw httpStatusCode;
    }
}


// User Register request return if user created.
export async function addNewUser(user: RegisterationUser): Promise<RegisterationUser> {
    try {
        const result = await axios.post<RegisterationUser>(serverUrl + 'register', user, {
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