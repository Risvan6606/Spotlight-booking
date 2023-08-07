import React, { useEffect, useState } from 'react'
import UserHeader from '../../componants/user/userHeader'
import { userRequest } from '../../axios';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client'
import { setNotifications } from '../../Redux/notificationSlice';

function BookArist() {
    // Edited
    const dispatch = useDispatch()
    const notification = useSelector((state) => state.notification.notification);
    const [socket, setSocket] = useState(null);
    var newSocket = io('http://localhost:5000');
    useEffect(() => {

        newSocket.on('chat message', (message) => {
            console.log('Received message:', message);
        });
        // setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        };
    }, []);
    // Edited
    const navigator = useNavigate()
    const singleArtist = useSelector((state) => state.singleArtist.singleArtist)

    useEffect(() => {
        if (!singleArtist?.moreDetails?.[0]?.firstName) {
            navigator('/artist-show')
        }
    })
    const [validation, setValidation] = useState({
        message: '',
        status: false
    })
    const [formData, setFormData] = useState({
        firstName: '',
        amount: singleArtist?.moreDetails?.[0]?.midBudjet,
        email: '',
        artist: singleArtist?.moreDetails?.[0]?.firstName + ' ' + singleArtist?.moreDetails?.[0]?.lastName,
        state: '',
        district: '',
        pincode: '',
        address: '',
        password: '',
        date: '',
        artist_id: singleArtist?.artist_id,
        agreeToTerms: false
    });
    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormData({
            ...formData,
            [name]: newValue
        });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData.firstName.trim().length === 0) {

            setValidation({ message: 'Space not allowed ', status: 'Fname' })
        } else if (formData.date === '') {

            setValidation({ message: 'please  Select  Date', status: 'date' })
        } else if (formData.amount.trim().length === 0) {

            setValidation({ message: 'Please enter amount', status: 'amount' })
        } else if (formData.email.trim().length === 0) {

            setValidation({ message: 'space not allowed', status: 'email' })
        } else if (formData.state.trim().length === 0) {

            setValidation({ message: 'space not allowed', status: 'state' })
        } else if (formData.district.trim().length === 0) {

            setValidation({ message: 'space not allowed', status: 'district' })
        } else if (formData.pincode.trim().length === 0 || formData.pincode.length < 6 || formData.pincode.length > 6) {

            setValidation({ message: 'please enter valid pincode', status: 'pincode' })
        } else if (formData.address.trim().length === 0 || formData.address.length < 10) {

            setValidation({ message: 'please Enter valid address', status: 'address' })
        } else if (formData.agreeToTerms === false) {

            toast('please accept the terms and conditions')
        } else {
            userRequest({
                url: '/api/user/bookartist',
                method: 'post',
                data: formData
            }).then((response) => {
                if (response.data.success) {
                    toast.success(response.data.message)
                    dispatch(setNotifications('have a booking'))
                    newSocket.emit('chat message', notification)
                } else {
                    toast(response.data.message)
                }
            }).catch((err) => toast('booking fail'))
        }
    };

    return (
        <>
            <UserHeader />
            <div className='p-11 booking-form-main-div'>
                <div className='p-10 bookng-form-div'>
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white banner_heading">Book Now</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white artistDetailsLabel">Full name</label>
                                <input type="text"
                                    id="first_name"
                                    name='firstName'
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="John"
                                    onChange={handleInputChange}
                                    onClick={() => setValidation({ status: false })}
                                />
                                {validation.status === 'Fname' && <p className="text-red-500">{validation.message} </p >}
                            </div>
                            <div >
                                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white artistDetailsLabel">Email address</label>
                                <input type="email"
                                    id="email"
                                    name='email'
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="john.doe@company.com"
                                    onChange={handleInputChange}
                                    onClick={() => setValidation({ status: false })}
                                />
                                {validation.status === 'email' && <p className="text-red-500">{validation.message} </p >}
                            </div>
                            <div>
                                <label for="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white artistDetailsLabel">Artist</label>
                                <input type="text"
                                    id="artist"
                                    value={singleArtist?.moreDetails?.[0]?.firstName + ' ' + singleArtist?.moreDetails?.[0]?.lastName}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    name='artist'
                                // onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <label for="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white artistDetailsLabel">State</label>
                                <input
                                    type="text"
                                    id="state"
                                    name='state'
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="state"
                                    onChange={handleInputChange}
                                    onClick={() => setValidation({ status: false })}
                                />
                                {validation.status === 'state' && <p className="text-red-500">{validation.message} </p >}
                            </div>
                            <div>
                                <label for="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white artistDetailsLabel">Distrinct</label>
                                <input type="text"
                                    id="company"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="district"
                                    name='district'
                                    onChange={handleInputChange}
                                    onClick={() => setValidation({ status: false })}
                                />
                                {validation.status === 'district' && <p className="text-red-500">{validation.message} </p >}
                            </div>
                            <div>
                                <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white artistDetailsLabel">Pin code </label>
                                <input
                                    type="number"
                                    id="pincode"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="1237843"
                                    name='pincode'
                                    onChange={handleInputChange}
                                    onClick={() => setValidation({ status: false })}
                                />
                                {validation.status === 'pincode' && <p className="text-red-500">{validation.message} </p >}
                            </div>
                            <div class="relative max-w-sm">
                                <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white artistDetailsLabel">Bookng Date </label>
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none mt-6">
                                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                    </svg>
                                </div>
                                <input id="datepickerId"
                                    datepicker type="date"
                                    value={formData.date}
                                    name="date"
                                    onChange={handleInputChange}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Select date" />
                                {validation.status === 'date' && <p className="text-red-500">{validation.message} </p >}
                            </div>
                            <div>
                                <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white artistDetailsLabel">Amount</label>
                                <input type="number"
                                    id="phone"
                                    name='amount'
                                    value={singleArtist?.moreDetails?.[0]?.midBudjet}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="123-45-678"
                                    // onChange={handleInputChange}
                                    onClick={() => setValidation({ status: false })}
                                />
                                {validation.status === 'amount' && <p className="text-red-500">{validation.message} </p >}
                            </div>
                        </div>

                        <div className="mb-6">
                            <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white artistDetailsLabel">address</label>
                            <textarea id="message"
                                rows="4"
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                name='address'
                                onChange={handleInputChange}
                                onClick={() => setValidation({ status: false })}
                                placeholder="Write your thoughts here..."
                            ></textarea>
                            {validation.status === 'address' && <p className="text-red-500">{validation.message} </p >}
                        </div>
                        <div className="mb-6">
                            <label for="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white artistDetailsLabel">Confirm password</label>
                            <input
                                type="password"
                                id="confirm_password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                name='password'
                                onChange={handleInputChange}
                                placeholder="•••••••••"
                                required />
                            {/* {validation.status === 'lastName' && <p className="text-red-500">{validation.message} </p >} */}
                        </div>
                        <div className="flex items-start mb-6">
                            <div className="flex items-center h-5">
                                <input id="remember"
                                    type="checkbox"
                                    value={formData.agreeToTerms}
                                    onClick={() => setFormData({ agreeToTerms: true })}
                                    onChange={handleInputChange}
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                                    name='agreeToTerms'
                                />
                            </div>
                            <label for="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form >
                </div >
            </div >
        </>
    )
}

export default BookArist