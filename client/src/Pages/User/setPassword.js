import { Button, Form, Input } from 'antd'
import axios from 'axios'
import React from 'react'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import GusetHeader from '../../publicAndProtect/gusetHeader'

function SetPassword() {
    const navigate = useNavigate()
    const onFinish = async (value) => {
        const response = await axios.post('/api/user/setpassword', value)
        if (response.data.success) {
            toast(response.data.message)
            navigate('/login')
        } else {
            toast(response.data.message)
        }
    }
    return (
        <>
            <GusetHeader />
            <div className='setPassword' >
                <div className='authentication_form card p-3' >
                    <h1 className='title'> Set Password</h1>
                    <Form layout='vertical' onFinish={onFinish}>
                        <Form.Item label='Password' name='password' >
                            <Input placeholder='Enter Password' />
                        </Form.Item>
                        <Form.Item label='Confirm Password' name='conPassword'>
                            <Input placeholder='Confirm Password' />
                        </Form.Item>
                        <Button className='primary my-1' htmlType='submit'> Submit</Button>
                    </Form>
                    <Link className='anchor' to='/login'> Go to login</Link>
                </div >
            </div >
        </>
    )
}

export default SetPassword