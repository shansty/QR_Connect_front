import { Menu, ConfigProvider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getToken, checkIsTokenValid, getIDFromToken, clearToken } from '../../utils';
import { getUserProfileName } from '../../axios';


type TypeDropDownItem = {
    key: string,
    label: string,
    onClick?: () => void
}

const AppHeader = () => {

    const link = process.env.REACT_APP_HOST;

    const [userProfileName, setUserProfileName] = useState("");
    const [dropDownItems, setDropDownItems] = useState<TypeDropDownItem[]>([{
        key: 'log_in',
        label: 'Log in',
        onClick: () => LogIn()
    }])

    const navigate = useNavigate();
    const token = getToken();

    useEffect(() => {
        getUserName();
    }, [])


    const menuItems = [
        { key: 'home', label: 'Home', onClick: () => Home() },
        { key: 'about', label: 'About' },
        { key: 'features', label: 'Features' },
        { key: 'howitworks', label: 'How it works' },
        {
            key: 'profile',
            label: <>{userProfileName} <i className="fa fa-user" aria-hidden="true"></i></>,
            children: dropDownItems,
        }
    ];

    const getUserName = () => {
        if (!token) {
            return;
        }
        try {
            const isValid = checkIsTokenValid(token);
            if (isValid) {
                const id = getIDFromToken(token);
                console.dir({ id, token })
                getUserProfileName(id, token, setUserProfileName);
                authorizedDropDownItems()
            } else {
                clearToken();
                setDropDownItems([{
                    key: 'log_in',
                    label: 'Log in',
                    onClick: () => LogIn()
                }])
            }
        } catch (error) {
            clearToken();
        }
    };

    const LogOut = () => {
        clearToken();
        navigate(0);
    }

    const LogIn = () => {
        navigate('/login');
    }

    const Setting = () => {
        navigate('/setting');
    }

    const Home = () => {
        navigate('/');
    }

    const authorizedDropDownItems = () => {
        setDropDownItems([
            {
                key: 'settings',
                label: 'Profile Settings',
                onClick: () => Setting()

            },
            {
                key: 'log_out',
                label: 'Log out',
                onClick: () => LogOut()
            }
        ])
    }

    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        itemHoverColor: "#1890ff",

                    },
                },
            }}
        >
            <div className="container-fluid">
                <div className="header">
                    <div className="logo">
                        <i className="fa fa-qrcode" aria-hidden="true"></i>
                        <a href={link}>QR_Connect</a>
                    </div>
                    <Menu
                        mode="horizontal"
                        items={menuItems}
                    />
                </div>
            </div>
        </ConfigProvider>
    );
};

export default AppHeader;