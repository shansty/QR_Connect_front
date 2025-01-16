import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Image, message, Upload } from 'antd';
import { getUserData, updateProfile } from '../../axios';
import { getToken, checkIsTokenValid, getIDFromToken, clearToken } from '../../utils';
import defaultImg from '../../assets/images/unnamed.png';
import dayjs from 'dayjs';
import { ConfigProvider } from 'antd';

const ProfileForm: React.FC = () => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const navigate = useNavigate();
    const token = getToken();
    const isValid = checkIsTokenValid(token);
    const userId = getIDFromToken(token);
    const dateTimestamp = dayjs('2025-01-01').valueOf();


    useEffect(() => {
        if (isValid) {
            getUserData(userId, token as string, form, setLoading, setImageUrl);
        } else {
            clearToken();
            navigate('/');
        }
    }, []);


    const handleSubmit = async (values: any) => {
        updateProfile(userId, token as string, values, form, setLoading, setImageUrl);
        // navigate(0)
    };


    const handleImageUpload = (info: any) => {
        const fileObject = info.file.originFileObj || info.file;
        if (fileObject) {
            const previewUrl = URL.createObjectURL(fileObject);

            setImageUrl(previewUrl);
            message.success(`${info.file.name} uploaded successfully`);

            form.setFieldsValue({ profileimage: fileObject });
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} upload failed`);
        }
    };


    const getFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.profileimage;
    };


    return (
        <ConfigProvider
            theme={{
                components: {
                    Form: {
                        labelColor: "#0050b3",
                        labelFontSize: 15
                    },
                },
            }}
        >
            <div className='block profile-info'>
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    style={{ maxWidth: 500 }}
                >
                    <Form.Item label="Profile Image" name="profileimage" getValueFromEvent={getFile} valuePropName="profileimage">
                        <div className="profile-img-block">
                            <Image
                                width={200}
                                height={200}
                                src={imageUrl || defaultImg}
                            />
                            <div className="profile-upload">
                                <Upload
                                    listType="picture-card"
                                    name="profileimage"
                                    beforeUpload={() => false}
                                    onChange={handleImageUpload}
                                >
                                    <Button icon={<UploadOutlined />}>Upload Profile Image</Button>
                                </Upload>
                            </div>
                        </div>

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
                        rules={[{ required: true, message: 'Please input birthday!' }]}
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
        </ConfigProvider>
    );
}

export default ProfileForm;
