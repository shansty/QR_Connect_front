import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { getHeaders } from "./utils";
import { LOGIN_URL, REGISTER_URL, PROFILE_URL } from "./configs/axios_urls";


export const signIn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    username: string,
    password: string,
    setUsername: React.Dispatch<React.SetStateAction<string>>,
    setPassword: React.Dispatch<React.SetStateAction<string>>,
    navigate: NavigateFunction,
) => {
    try {
        e.preventDefault();
        const response = await axios.post(LOGIN_URL, { username, password },
            { headers: { 'Content-Type': 'application/json' } });

        const token = response?.data?.token;
        localStorage.setItem("token", token);

        setUsername('');
        setPassword('');
        navigate('/')
    } catch (err: any) {
        if (err.response.data) {
            window.alert(` ${err.response.data.message}`);
        } else {
            window.alert(`Error: ${err}`);
        }
    }
}


export const signUp = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    setIsRegister: React.Dispatch<React.SetStateAction<boolean>>,
    isRegister: boolean,
    email: string,
    password: string,
    username: string,
    setEmail: React.Dispatch<React.SetStateAction<string>>,
    setUsername: React.Dispatch<React.SetStateAction<string>>,
    setPassword: React.Dispatch<React.SetStateAction<string>>,
) => {

    e.preventDefault();
    setIsRegister(!isRegister)
    try {
        await axios.post(REGISTER_URL, { email, password, username },
            { headers: { 'Content-Type': 'application/json' } });
        setEmail('');
        setPassword('');
        setUsername('');
    } catch (err: any) {
        if (err.response.data) {
            window.alert(` ${err.response.data.message}`);
        } else {
            window.alert(`Error: ${err}`);
        }
    }
}


export const getUserProfileName = async (id:number, token:string, setUserProfileName: React.Dispatch<React.SetStateAction<string>>) => {
    try {
        const response = await axios.get(`${PROFILE_URL}/${id}`,
            {
                headers: getHeaders(token)
            });
        setUserProfileName(response.data.userName)
    } catch (err: any) {
        if (err.response.data) {
            window.alert(` ${err.response.data.message}`);
        } else {
            window.alert(`Error: ${err}`);
        }
    }
}