import { LoginUser } from "../Interfaces/LoginUser";
import { Product } from "../Interfaces/Product";
import { RegisterationUser } from "../Interfaces/RegisterationUser";

const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;


// if the user is valid return error messages.
export function getRegistrationErrorsValidation(user: RegisterationUser): Record<string, string> {
    let errors: Record<string, string> = {};

    if (!isNameValid(user.username)) {
        errors.username = "Username must be at least 2 characters long.";
    }

    if (!isNameValid(user.firstname)) {
        errors.firstname = "First name must be at least 2 characters long.";
    }

    if (!isNameValid(user.lastname)) {
        errors.lastname = "Last name must be at least 2 characters long.";
    }

    if (!isPasswordValid(user.password)) {
        errors.password = "Password must be at least 8 characters long, include 1 uppercase, 1 lowercase, 1 digit, and 1 special character.";
    }

    if (user.password !== user.rePassword) {
        errors.rePassword = "Passwords do not match.";
    }

    return errors;
}


// if the user login details is valid return erros messages.
export function getLoginErrorsValidation(user: LoginUser): Record<string, string> {
    let errors: Record<string, string> = {};

    if (!isNameValid(user.username)) {
        errors.username = "Username must be at least 2 characters long.";
    }

    if (!isPasswordValid(user.password)) {
        errors.password = "Password must be at least 8 characters long, include 1 uppercase, 1 lowercase, 1 digit, and 1 special character.";
    }

    return errors;
}



export function getProductErrors(product: Product): Record<string, string> {
    let errors: Record<string, string> = {};

    if (!product.name || product.name.length < 2 || product.name.length > 50) {
        errors.name = "Product name must be at least 2 and max 50 characters long.";
    }

    if (!product.type || product.type === '0') {
        errors.type = "Please select a product type.";
    }

    if (!product.barcode || product.barcode.toString().length < 8) {
        errors.barcode = "Barcode must be at least 8 digits long.";
    }

    if (!product.date) {
        errors.date = "Please select a valid date.";
    }

    if (!product.description || product.description.length < 10) {
        errors.description = "Description must be at least 10 characters long.";
    }

    return errors;
}



// if the password is valid return true, else return false.
export function isPasswordValid(password: string): boolean {
    if (validPassword.test(password))
        return true;

    return false;
}

export function isNameValid(text: string): boolean {
    if (text === undefined)
        return false;
    return text.length >= 2;
}