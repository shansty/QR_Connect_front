import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { signIn, signUp } from '../../axios';
import axios from 'axios';
import { Form, Button, Input } from 'antd';


type FieldType = {
    username?: string;
    password?: string;
    email?: string;
};

const AuthPage: React.FC = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("");
    const [isRegister, setIsRegister] = useState(true);

    const navigate = useNavigate();

    const login = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        signIn(e, username, password, setUsername, setPassword, navigate)
    }

    const register = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        signUp(e, setIsRegister, isRegister, email, password, username, setEmail, setUsername, setPassword)
    }

    const handleClick = () => {
        setIsRegister(!isRegister)
    }

    const navigated = (url: string) => {
        window.location.href = url;
    }

    const auth = async () => {
        const response = await axios.post('http://localhost:3001/auth/google');
        navigated(response.data.url);
    }

    return (
        <div className='block formBlock'>
            <div className='container-fluid'>
                <Form layout='vertical' className="auth_form">
                    <Form.Item<FieldType>
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input
                            value={username}
                            placeholder="Please enter username"
                            id="username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Item>

                    {!isRegister && (
                        <>
                            <Form.Item<FieldType>
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <Input
                                    value={email}
                                    placeholder="Please enter email"
                                    id="email"
                                    onChange={(e) => setEmail(e.target.value)} />
                            </Form.Item>
                        </>
                    )}

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input
                            value={password}
                            placeholder="Please enter password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)} />
                    </Form.Item>

                    {isRegister && (
                        <>
                            <div className='sign_in_btns'>
                                <Button className='btn-auth' type="primary" size="middle" onClick={login}>Sign In</Button>
                                <button className="btn-google-auth" type="button" onClick={() => auth()}>
                                    <img className="btn-auth-img" src='/google_btn_l.png' alt='google sign in' />
                                </button>
                            </div>
                            <p className="form_text" onClick={handleClick}>Don't have an account? Click to register.</p>
                        </>)}

                    {!isRegister && (
                        <>
                            <Button type="primary" className='btn-auth' size="middle" onClick={register}>Sign Up</Button>
                            <p className="form_text" onClick={handleClick}>Click for sign in.</p>
                        </>
                    )}
                </Form>
            </div>
        </div >
    );
}

export default AuthPage;