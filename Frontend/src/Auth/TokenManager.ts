const tokenKey = 'token'; // Token key

//set token value in local storage
export function setToken(tokenValue?: string) {
    if (!tokenValue) return;
    localStorage.setItem(tokenKey, tokenValue);
}

//get token value from local storage
export function getToken(): string {
    return localStorage.getItem(tokenKey) || '';
}

//delete token stored in local storage
export function removeToken() {
    localStorage.removeItem(tokenKey);
}

//verify if token exist in local storage
export function verifyToken(): boolean {
    return getToken().length > 0;
}