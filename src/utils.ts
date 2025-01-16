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


export const checkIsTokenValid = (token: string | null): boolean => {
    if (!token) {
        return false;
    } else {
        const decoded = jwtDecode(token);
        let exparation = decoded.exp as number;
        if (Date.now() > (exparation * 1000)) {
            return false;
        }
        return true;
    }
}


export const getIDFromToken = (token: string | null): number => {
    if(!token) {
        return 0;
    }
    const decoded: ICustomJwtPayload = jwtDecode(token);
    return decoded.id;
}

export const clearToken = (): void => {
    localStorage.removeItem("token")
}