import { LoginUser } from "../Interfaces/LoginUser";
import { RegisterationUser } from "../Interfaces/RegisterationUser";

const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;


// if the user is valid return true, else return false.
export function isRegistrationValid(user: RegisterationUser): boolean {
    return isNameValid(user.username) &&
        isNameValid(user.firstname) &&
        isNameValid(user.lastname) &&
        isPasswordValid(user.password) &&
        user.password === user.rePassword;
}


// if the user login details is valid return true, else return false.
export function isLoginValid(user: LoginUser): boolean {
    return isNameValid(user.username) &&
        isPasswordValid(user.password)

}



// if the password is valid return true, else return false.
export function isPasswordValid(password: string): boolean {
    if (validPassword.test(password))
        return true;

    return false;
}

export function isNameValid(text: string): boolean {
    return text.length >= 2;
}