import { Button, Form, Input } from 'antd'
import axios from 'axios'
import React from 'react'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

function SetPassword() {
    const navigate = useNavigate()
    const onFinish = async (value) => {
        try {
            const response = await axios.post('/api/admin/setpassword', value)
            if (response.data.success) {
                toast.success(response.data.message)
                navigate('/admin/login')
            } else {
                toast(response.data.message)
            }
        } catch (error) {
            toast.error('server are slow please check latter')
        }

    }
    return (
        <div className='setPasswords' >
            <div className='authentication_form  p-3' >
                <h1 className='title'> Set Password</h1>
                <Form layout='vertical' onFinish={onFinish}>
                    <Form.Item label='Password' name='password' >
                        <Input placeholder='Enter Password' />
                    </Form.Item>
                    <Form.Item label='Confirm Password' name='conPassword'>
                        <Input placeholder='Confirm Password' />
                    </Form.Item>
                    <Button className='primary my-1' htmlType='submit'> Submit</Button>
                    <Link className='anchor' to='/login'> Go to login</Link>
                </Form>
            </div >
        </div >
    )
}

export default SetPassword