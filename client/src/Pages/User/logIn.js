import React from 'react'
import { Button, Form, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../Redux/alertSlice'
import './signUp.css'
import GusetHeader from '../../publicAndProtect/gusetHeader'


function LogIn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinish = async (value) => {
        try {
            dispatch(showLoading())
            const response = await axios.post('/api/user/login', value)
            dispatch(hideLoading())
            if (response.data.success) {
                toast.success(response.data.message)
                toast('readirecting to home page')
                localStorage.setItem('token', response.data.data);
                navigate('/')
            } else {
                dispatch(hideLoading())
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error('somthing went wrong')
        }
    }
    return (
        <>
            <GusetHeader />
            <div className='authentication' >
                <div className='authentication_form cards p-3' >
                    <h1 className='title'>SIGN IN</h1>
                    <Form layout='vertical' onFinish={onFinish}>
                        <Form.Item label='Email' name='email' >
                            <Input placeholder='Enter Email' />
                        </Form.Item>
                        <Form.Item label='Password' name='password'>
                            <Input placeholder='Enter password' type='password' />
                        </Form.Item>
                        <Link className='forget' to='/forgot'>Forget password</Link>
                        <Button className='primary my-1' htmlType='submit'>SIGN UP</Button>
                        <Link className='anchor' to='/signup'> Go to SignUp</Link>
                    </Form>
                </div >
            </div >
        </>
    )
}

export default LogIn
