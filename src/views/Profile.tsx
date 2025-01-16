import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/common/Header';
import { UploadOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Image, message, Upload } from 'antd';
import { getUserData, updateProfile } from '../axios';
import { getToken, checkIsTokenValid, getIDFromToken, clearToken } from '../utils';
import defaultImg from '../assets/images/unnamed.png';

const Profile: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    // const [file, setFile] = useState<File | null>(null);
    const navigate = useNavigate();
    const token = getToken();
    const isValid = checkIsTokenValid(token);
    const userId = getIDFromToken(token);
    


    useEffect(() => {
        if (isValid) {
            getUserData(userId, token as string, form, setLoading, setImageUrl);
        } else {
            clearToken();
            navigate('/');
        }
    }, []);


    const handleSubmit = async (values: any) => {
        console.dir({ values: values })
        console.log("Profile 29")
        console.dir({userId})

        updateProfile(userId, token as string, values, form, setLoading, setImageUrl);
        // navigate(0);
    };



    const handleImageUpload = (info: any) => {
        const fileObject = info.file.originFileObj || info.file; 
        if (fileObject) {
            const previewUrl = URL.createObjectURL(fileObject);
    
            setImageUrl(previewUrl); 
            message.success(`${info.file.name} uploaded successfully`);
    
            form.setFieldsValue({ profileImage: fileObject });
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} upload failed`);
        }
    };


    const getFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        console.log("Check")
        console.dir({e: e})
        return e?.profileImage;
    };



    return (
        <div>
            <AppHeader />
            <Form
                form={form}
                onFinish={handleSubmit}
                style={{ maxWidth: 500 }}
                initialValues={{ variant: 'filled' }}
            >
                <Form.Item label="Profile Image" name="profileImage" getValueFromEvent={getFile} valuePropName="profileImage">
                    <Image
                        width={200}
                        height={200}
                        src={imageUrl || defaultImg}
                    />
                    <Upload
                        listType="picture-card"
                        name="profileImage"
                        beforeUpload={() => false}
                        onChange={handleImageUpload}
                    >
                        <Button icon={<UploadOutlined />}>Upload Profile Image</Button>
                    </Upload>
                </Form.Item>

                <Form.Item
                    label="Username"
                    name="user_name"
                    rules={[{ required: true, message: 'Please fill username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Phone number"
                    name="phone_number"
                    rules={[{ required: false }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="BirthDay"
                    name="birthday"
                    rules={[{ required: true, message: 'Please input birthday!'  }]}
                >
                    <DatePicker />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Profile;