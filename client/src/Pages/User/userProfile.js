import React, { useEffect, useState } from "react";
import { Button } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import UserHeader from "../../componants/user/userHeader";
import Footer from "../../componants/user/footer";
import { userRequest } from "../../axios";
import { toast } from "react-hot-toast";



const UserProfile = () => {
    const [profile, setProfile] = useState([])
    const [Details, setDetails] = useState()
    const getData = () => {
        userRequest({
            url: '/api/user/user_profiledata',
            method: 'post',
        }).then((response) => {
            if (response.data.data) {
                setProfile(response.data.data)
            } else {

            }
        }).catch((err) => {
            toast('somthing went wrong')
        })
    }

    useEffect(() => {
        getData()
    })
    return (
        <>
            <UserHeader />
            <div>
                <div class="">
                    <div
                        style={{
                            backgroundColor: "peru",
                            textAlign: "center",
                            color: "white",
                            fontSize: "large",
                        }}
                        class="bg-white shadow-md p-4"
                    >
                        <h2>PROFILE</h2>

                        <div
                            style={{ backgroundColor: "darkgoldenrod" }}
                            className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-center">
                                    <img
                                        className="w-20 h-20 rounded-full object-cover object-center border-4 border-blue-500"
                                        src={profile?.profile}
                                    // alt="Profile"
                                    />
                                </div>
                                <h2 className="mt-4 text-gray-800 text-lg font-semibold text-center">
                                    {profile?.name}
                                </h2>
                                <p className="text-gray-600 text-center">{profile?.email}</p>
                                <p className="text-gray-600 text-center">{profile?.phone}</p>

                                <div className="mt-4">
                                    <p className="text-gray-600">{Details?.description}</p>
                                </div>
                                <div className="mt-6">


                                    <h1 className="text-gray-600 text-center">
                                        Location:-{Details?.location}
                                    </h1>
                                    {Details == null && (
                                        <Link to="/adDetails">
                                            <Button
                                                type="primary"
                                                style={{
                                                    backgroundColor: "red",
                                                    marginLeft: "15px",
                                                    marginRight: "10px",
                                                }}
                                                size={10}
                                            >
                                                Add Id
                                            </Button>
                                        </Link>
                                    )}
                                    <Link to="/editprofile">
                                        <Button
                                            type="primary"
                                            style={{ backgroundColor: "green", marginLeft: "10px" }}
                                            size={10}
                                        >
                                            EDIT
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                            <a

                                className="text-blue-500 hover:underline text-center block"
                            >
                                ID DETAILS
                            </a>
                            <div
                                style={{ width: "100%", height: "100%" }}
                                className="bg-white rounded-lg shadow-md p-4 w-48"
                            >
                                <div className="mb-2">
                                    <img
                                        src={Details?.idimage}
                                        alt="ID Image"
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                </div>
                                <h2 className="text-lg font-semibold mb-2">ID NUMBER</h2>
                                <p className="text-gray-600 text-sm">{Details?.idnumber}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            < Footer />
        </>
    );
}
export default UserProfile;