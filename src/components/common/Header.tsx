import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getToken, checkToken, getIDFromToken, clearToken } from '../../utils';
import { getUserProfileName } from '../../axios';


type TypeDropDownItem = {
    key: string,
    label: string,
    onClick?: () => void 
}

const AppHeader = () => {

    const [userProfileName, setUserProfileName] = useState("");
    const [dropDownItems, setDropDownItems] = useState<TypeDropDownItem[]>([{
        key: 'log_in',
        label: 'Log in',
        onClick: () => LogIn(),
    }])

    const navigate = useNavigate();
    const token = getToken();

    useEffect(() => {
        getUserName();
    }, [token])


    const menuItems = [
        { key: 'home', label: 'Home' },
        { key: 'about', label: 'About' },
        { key: 'features', label: 'Features' },
        { key: 'howitworks', label: 'How it works' },
        {
            key: 'profile',
            label: <i className="fa fa-user" aria-hidden="true"></i>,
            children: dropDownItems
        }
    ];

    const getUserName = () => {
        if (!token) {
            return;
        }
        try {
            checkToken(token);
            const id = getIDFromToken(token);
            getUserProfileName(id, token, setUserProfileName);
            authorizedDropDownItems()
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

    const authorizedDropDownItems = () => {
        setDropDownItems([
            {
                key: 'log_out',
                label: userProfileName,
            },
            {
                key: 'log_out',
                label: 'Log out',
                onClick: () => LogOut(),
            }
        ])
    }

    return (
        <div className="container-fluid">
            <div className="header">
                <div className="logo">
                    <i className="fa fa-qrcode" aria-hidden="true"></i>
                    <a href="http://google.com">QR_Connect</a>
                </div>
                <Menu
                    mode="horizontal"
                    defaultSelectedKeys={['home']}
                    items={menuItems}
                />
                <p className="user_name">{userProfileName}</p>
            </div>
        </div>
    );
};

export default AppHeader;