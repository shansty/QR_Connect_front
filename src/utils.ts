import e from "express";
import { jwtDecode } from "jwt-decode";


interface ICustomJwtPayload {
    id: number;
    exp: number;
    iat: number;
}


export const getHeaders = (token: string) => {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}


export const getToken = (): string | null => {
    let token = localStorage.getItem("token");
    if (token) {
        return token;
    }
    return null;
}


export const checkToken = (token: string | null): void => {
    if (!token) {
        window.location.assign("http://localhost:3000/")
    } else {
        const decoded = jwtDecode(token);
        let exparation = decoded.exp as number;
        if (Date.now() > (exparation * 1000)) {
            clearToken();
            window.location.assign("http://localhost:3000/")
        }
    }
}


export const getIDFromToken = (token: string): number => {
    const decoded: ICustomJwtPayload = jwtDecode(token);
    return decoded.id;
}


export const clearToken = (): void => {
    localStorage.removeItem("token")
}