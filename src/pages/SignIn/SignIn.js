import React, { useEffect } from 'react'
import { Row, Button, Form, Input, message, Divider } from 'antd'
import { Link } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
const SignIn = props => {
    const {
        history,
        isSignedIn,
        signInFail,
        onFinishFailed,
        onFinish,
        onEmailChange,
        onPasswordChange,
        signInLoading,
    } = props
    const { uiConfig, firebaseAuth } = props
    useEffect(() => {
        if (isSignedIn) {
            message.success('Đăng nhập thành công')
            const prevPath = localStorage.getItem('prevSignIn')
            console.log(prevPath)
            if (!prevPath) {
                history.push('/')
            } else if (prevPath === '/signup') {
                history.push('/')
            } else {
                history.goBack()
            }
        }
    }, [isSignedIn])
    useEffect(() => {
        if (signInFail) {
            message.error('Tài khoản hoặc mật khẩu không đúng')
        }
    }, [signInFail])
    const formStyle = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 5,
        },
    }
    const chkbStyle = {
        wrapperCol: {
            offset: 8,
            span: 8,
        },
    }
    return (
        <div className="login-form-mask">
            <div className="login-form-container">
                <Form
                    className="login-form"
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item className="form-title">
                        <h6>Đăng nhập</h6>
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa nhập tên tài khoản',
                            },
                        ]}
                        className="email-item"
                    >
                        <Input className="email" onChange={onEmailChange} />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa điền mật khẩu',
                            },
                        ]}
                        className="password-item"
                    >
                        <Input.Password
                            className="password"
                            onChange={onPasswordChange}
                        />
                    </Form.Item>
                    <Form.Item className="login-form-button-item">
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>
                    <Form.Item className="redirect-signup">
                        <span>
                            Chưa có tài khoản?
                            <Link to="/signup"> Đăng kí </Link> ngay
                        </span>
                    </Form.Item>
                    <Divider>Hoặc</Divider>
                    <Form.Item className="firebaseauth">
                        <p>Đăng nhập với</p>
                        <StyledFirebaseAuth
                            className="auth-cards"
                            uiConfig={uiConfig}
                            firebaseAuth={firebaseAuth}
                        />
                    </Form.Item>
                </Form>
            </div>
            <div
                className="loading-overlay"
                style={{ display: signInLoading ? 'block' : 'none' }}
            >
                <div className="container">
                    <LoadingOutlined className="loading-spinner" />{' '}
                    <span>Signing in...</span>
                </div>
            </div>
        </div>
    )
}

export default SignIn
