
import './signUp.css'
import React from 'react'
import { Button, Form, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../Redux/alertSlice'
import GusetHeader from '../../publicAndProtect/gusetHeader'


function SignUp() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const onFinish = async (value) => {
    //     try {
    //         dispatch(showLoading())
    //         const response = await axios.post('/api/user/signup', value)
    //         dispatch(hideLoading())
    //         console.log(response.data.message)
    //         if (response.data.success === 'otp') {
    //             toast.success('Please Enter the opt')
    //             setOtp(true)
    //             return
    //         } else if (response.data.success === true) {
    //             toast.success('SignUp successfull')
    //             toast('readirecting to login page')
    //             navigate('/login')
    //         }
    //         else if (response.data.success === false) {
    //             toast.error(response.data.message)
    //         } else if (response.data.success === 'space') {
    //             toast.error(response.data.message)
    //         } else if (response.data.success === 'mobile') {
    //             toast.error(response.data.message)
    //         } else if (response.data.success === 'inccorect') {
    //             toast.error(response.data.message)
    //         }
    //     } catch (error) {
    //         dispatch(hideLoading())
    //         toast.error('something wents worong')
    //     }
    // }
    const onFinish = async (value) => {
        try {
            dispatch(showLoading())
            const response = await axios.post('/api/user/signup', value)
            dispatch(hideLoading())
            if (response.data.success) {
                toast.success(response.data.message)
                navigate('/otp')
            } else {
                toast(response.data.message)
            }
        } catch (error) {
            toast('somthing went worng')
        }
    }
    return (
        <>
            <GusetHeader />
            <div className='authentication' >
                <div className='authentication_form cards p-3' >
                    <h1 className='title'>SIGN UP</h1>
                    <Form layout='vertical' onFinish={onFinish}>
                        <Form.Item label='First Name' name='first_name' >
                            <Input placeholder='Enter First Name' />
                        </Form.Item>
                        <Form.Item label='Last Name' name='last_name'>
                            <Input placeholder='Enter Last Name' />
                        </Form.Item>
                        <Form.Item label='Mobile' name='mobile'>
                            <Input placeholder='Enter Mobile No'></Input>
                        </Form.Item>
                        <Form.Item label='Email' name='email'>
                            <Input placeholder='Enter Email' />
                        </Form.Item>
                        <Form.Item label='Password' name='password'>
                            <Input placeholder='Enter password' type='password' />
                        </Form.Item>
                        {/* {otp === true && < Form.Item label='Otp' name='otp'>
                        <Input placeholder='Enter otp' />
                    </Form.Item>} */}
                        <Button className='primary my-1' htmlType='submit'>SIGN UP</Button>
                        <Link className='anchor' to='/login'> Go to Login</Link>
                    </Form>
                </div >
            </div >
        </>
    )
}

export default SignUp