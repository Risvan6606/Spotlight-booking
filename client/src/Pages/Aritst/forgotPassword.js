import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


function ArtistforgotPassword() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        otp: false,
        responseOtp: ''
    })
    const handelInputChange = (event) => {
        const { name, value } = event.target
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }))
    }
    const handelSubmit = async (event) => {
        try {
            event.preventDefault()
            console.log(formData.otp.length)
            if (formData.otp === false) {
                const response = await axios.post('/api/artist/forgotpassword', formData)
                if (response.data.success) {
                    toast.success(response.data.message)
                    setFormData({ otp: true, responseOtp: response.data.otp })
                } else {
                    toast.error(response.data.message)
                }
            } else {
                console.log(formData.responseOtp, 'respose')
                console.log(formData.otp, 'otp')
                if (formData.responseOtp === formData.otp) {
                    toast('Create new password')
                    navigate('/artist/setpassword')
                } else {
                    toast.error('Your enterd otp has inccorrect')
                }
            }
        } catch (error) {
            console.log('somthing went wrong', error)
        }
    }
    return (
        < div class="container" >
            <div class="row">
                <div class="col-md-4 col-md-offset-4">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <div class="text-center">
                                <img src="../../public/images/padlock.png" alt="Padlock" />
                                <h2 class="text-center">Forgot Password?</h2>
                                <p>You can reset your password here.</p>
                                <div class="panel-body">
                                    <form id="register-form" class="form" onSubmit={handelSubmit}>
                                        <div class="form-group">
                                            <div class="input-group">
                                                <span class="input-group-addon"><i class="glyphicon glyphicon-envelope color-blue"></i></span>
                                                <input
                                                    id="email"
                                                    name="email"
                                                    onChange={handelInputChange}
                                                    placeholder="email address"
                                                    class="form-control"
                                                    type="email"
                                                />
                                            </div>
                                        </div>
                                        {formData.otp && < div class="form-group">
                                            <div class="input-group">
                                                {/* <span class="input-group-addon"><i class="glyphicon glyphicon-envelope color-blue"></i></span> */}
                                                <input
                                                    id="otp"
                                                    name="otp"
                                                    onChange={handelInputChange}
                                                    placeholder="Enter otp"
                                                    class="form-control"
                                                    type="number"
                                                />
                                            </div>
                                        </div>}
                                        {formData.otp !== true && !formData.otp && <div class="form-group">
                                            <input name="recover-submit" class="btns  btn-primary btn-block" type="submit" />
                                        </div>}
                                        {
                                            formData.otp && <div class="form-group">
                                                <input name="recover-submit" class="btns  btn-primary btn-block" type="submit" value='Enter' />
                                            </div>
                                        }
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default ArtistforgotPassword