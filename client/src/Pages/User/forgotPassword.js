import React, { useState } from 'react'
import firebase from '../../fireBase/fireBase';
// import { Button, Form, Input } from 'antd'
// import { Link } from 'react-router-dom'
// import axios from 'axios'
// import './signUp.css'
import '../User/forgotPassword.css'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import GusetHeader from '../../publicAndProtect/gusetHeader';


function Forgotpassword() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        mobile: false,
        otp: false
    });

    const handelChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const configureCaptcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
                // onSignInSubmit();
                console.log('recaptchaVerifier')
            },
            defaultCountry: 'IN'
        });
    }


    const onSignInSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.post("/api/user/forgot", formData)
        console.log(response.data.success)
        if (response.data.success) {
            configureCaptcha()
            const phoneNumber = "+91" + formData.mobile
            console.log(phoneNumber)
            const appVerifier = window.recaptchaVerifier;
            firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
                .then((confirmationResult) => {
                    window.confirmationResult = confirmationResult;
                    console.log('OTP has been sent')
                }).catch((error) => {
                    console.log('SMS Not send')
                    console.log(error)
                });
        } else {
            toast("mobile no inccrect please check")
        }
    }
    const onSubmitOTP = (e) => {
        e.preventDefault()
        const code = formData.otp
        console.log(code)
        window.confirmationResult.confirm(code).then((result) => {
            const user = result.user;
            console.log(JSON.stringify(user))
            navigate('/setpassword')
        }).catch((error) => {
            toast('Otp has inccrect please check')
        });
    }
    return (
        <>
            <GusetHeader />
            <div className='forgot'>
                <div className='forgot_form card p-3'>
                    <h1 className='titles'>Forget Password</h1>
                    <form onSubmit={onSignInSubmit} className='mobile_form'>
                        <div id='sign-in-button'></div>
                        <input type='number' className='input' name='mobile' placeholder='Mobile No' required onChange={handelChange} />
                        <button type='submit' className='butn'>Submit</button>
                    </form>

                    <h1 className='titles'>Enter OTP</h1>
                    <form onSubmit={onSubmitOTP} className='mobile_form'>
                        <input type='number' className='input' name='otp' placeholder='OTP' required onChange={handelChange} />
                        <button type='submit' className='butn'>Submit</button>
                    </form>
                    <Link className='anchor_forgot' to='/login'>go to login</Link>

                </div>
            </div >
        </>
    );
}

export default Forgotpassword;
