import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { getHeaders } from "./utils";
import { FormInstance } from 'antd';
import { LOGIN_URL, REGISTER_URL, PROFILE_URL } from "./configs/axios_urls";
import dayjs from 'dayjs'

export const signIn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    username: string,
    password: string,
    setUsername: React.Dispatch<React.SetStateAction<string>>,
    setPassword: React.Dispatch<React.SetStateAction<string>>,
    navigate: NavigateFunction,
): Promise<void> => {
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
): Promise<void> => {

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


export const getUserProfileName = async (id: number, token: string, setUserProfileName: React.Dispatch<React.SetStateAction<string>>): Promise<void> => {
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


export const getUserData = async (id: number, token: string, form: FormInstance, setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setImageUrl: React.Dispatch<React.SetStateAction<string | null>>): Promise<void> => {

    try {
        const response = await axios.get(`${PROFILE_URL}/userData/${id}`,
            {
                headers: getHeaders(token)
            });
        const userData = response.data.userData;

        form.setFieldsValue({
            ...userData,
            birthday: userData.birthday ? dayjs(userData.birthday, "YYYY-MM-DD") : null,
            // birthday: userData.birthday ? dayjs(userData.birthday) : null,
        });
        if (userData.profileimage) {
            setImageUrl(`http://localhost:3001${userData.profileimage}`);
        }
    } catch (err: any) {
        if (err.response.data) {
            window.alert(` ${err.response.data.message}`);
        } else {
            window.alert(`Error: ${err}`);
        }
    } finally {
        setLoading(false);
    }
};

export const updateProfile = async (id: number, token: string, values: any, form: FormInstance, setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setImageUrl: React.Dispatch<React.SetStateAction<string | null>>): Promise<void> => {

    try {
        setLoading(true);
        console.dir({ values_from_form: values })
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            if (key === 'profileimage' && value instanceof File) {
                formData.append(key, value);
            } else if (key === 'birthday' && value) {
                const formattedDate = dayjs(value as Date).format('YYYY-MM-DD');
                formData.append(key, formattedDate);
            } else {
                formData.append(key, value as string);
            }
        });

        const response = await axios.put(`${PROFILE_URL}/${id}`, formData, {
            headers: {
                ...getHeaders(token),
                'Content-Type': 'multipart/form-data',
            },
        });

        console.dir({ response: response.data })

        form.setFieldsValue({
            ...response.data.userData,
            birthday: dayjs(response.data.userData.birthday, "YYYY-MM-DD"),
            // birthday: dayjs(response.data.userData.birthday), 
        });

        const check = dayjs(response.data.userData.birthday, "YYYY-MM-DD")

        console.dir({ data_dayjs: check })

        if (response.data.userData.profileimage) {
            setImageUrl(`http://localhost:3001${response.data.userData.profileimage}`);
        }

    } catch (err: any) {
        if (err.response.data) {
            window.alert(`${err.response.data.message}`);
        } else {
            window.alert(`Error: ${err}`);
        }
    } finally {
        setLoading(false);
    }
};

