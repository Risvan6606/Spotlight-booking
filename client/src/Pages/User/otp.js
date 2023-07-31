import { Button, Form, Input } from 'antd'
import axios from 'axios'
import React from 'react'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../Redux/alertSlice'
import GusetHeader from '../../publicAndProtect/gusetHeader'

function Otp() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinish = async (value) => {
        try {
            dispatch(showLoading())
            const response = await axios.post('/api/user/otp', value)
            dispatch(hideLoading())
            if (response.data.success) {
                toast.success(response.data.message)
                navigate('/login')
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast('somthing went wrong')
        }
    }
    return (
        <>
            <GusetHeader />
            <div className='setPassword' >
                <div className='authentication_form card p-3' >
                    <h1 className='title'> Set Password</h1>
                    <Form layout='vertical' onFinish={onFinish}>
                        <Form.Item label='Otp' name='otp' >
                            <Input placeholder='Enter otp' />
                        </Form.Item>
                        <Button className='primary my-1' htmlType='submit'> Submit</Button>
                    </Form>
                    <Link className='anchor' to='/login'> Go to login</Link>
                </div >
            </div >
        </>
    )
}

export default Otp