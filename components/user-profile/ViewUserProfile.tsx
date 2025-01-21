"use client"

import React from 'react';
import Image from "next/image";
import { HiOutlineCamera } from "react-icons/hi";
import { Button } from 'react-day-picker';
import { CiUser } from "react-icons/ci";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useGetUserProfileQuery } from '@/redux/services/user-profile';

const ViewProfileComponent = () => {
    const route = useRouter();
    const { data: session } = useSession();
    const { data: userProfile, isLoading, isError } = useGetUserProfileQuery({});
    console.log("Data: ", userProfile)
   
    if (isError || !userProfile) {
        return <p>Error fetching user profile...</p>;
    }

    return (
        <div id={`update-profile-card`} className={`flex flex-col lg:flex-row gap-7 py-5 `}>
            <div className={`w-11/12 lg:w-[300px] h-[400px] flex flex-col items-center justify-center bg-white rounded-[20px]`}>
                <div className={`relative`}>
                    <div className={`absolute top-[187px] left-[160px] bg-primaryColor border-2 border-white p-1 rounded-full hover:cursor-pointer`}>
                        <HiOutlineCamera onClick={() => route.push("/dashboard/editprofile")} size={24} color={`white`} />
                    </div>
                    <Image
                        src={userProfile.avatar || session?.user?.image || "https://idata-api.istad.co/public-media/7ef3b0f4-d466-4aa2-8aaa-f4f0ec498541.jpg"}
                        alt={`profile-image`}
                        width={1000}
                        height={1000}
                        className={`rounded-full w-56 h-56 object-cover`}
                    />
                </div>
                <div className={`text-secondaryColor text-h16 pt-2`}>
                    {userProfile?.position || "Developer"}
                </div>
            </div>
            <div className={`flex flex-col max-w-3xl gap-y-[20px] p-[20px] lg:p-[30px] bg-white rounded-[20px] grow`}>
                <div className={`flex items-center gap-x-2.5 text-primaryColor`}>
                    <CiUser size={24} />
                    <span className={`border-b-2 text-h18 border-secondaryColor`}>
                        User Information
                    </span>
                </div>
                <div className={`grid grid-cols-2 gap-5 w-full`}>
                    <div className={`flex flex-col`}>
                        <label htmlFor={`firstName`} className={`text-[16px] pl-2 text-fontSecondary`}>First Name</label>
                        <div
                            id={`firstName`}
                            className={`h-[46px] w-full text-primaryColor pt-3 border-[1px] bg-white border-gray-300 rounded-full ps-[20px]`}
                        >{userProfile?.firstName || "First Name"}</div>
                    </div>
                    <div className={`flex flex-col `}>
                        <label htmlFor={`lastName`} className={`text-[16px] pl-2 text-primaryColor`}>Last Name</label>
                        <div
                            id={`lastName`}
                            className={`h-[46px] w-full text-primaryColor border-[1px] bg-white border-gray-300 rounded-full pt-3 ps-[20px]`}
                        >{userProfile?.lastName || "Last Name"}</div>
                    </div>
                </div>
                <div className={`flex flex-col `}>
                    <label className={`text-[16px] text-primaryColor pl-2`}>Username</label>
                    <div id={'username'}
                        className={`h-[46px] pt-3 w-full text-primaryColor border-[1px] bg-white border-gray-300 rounded-full  ps-[20px]`}
                    >{userProfile?.username || session?.user?.name }</div>
                </div>
                <div className={`flex flex-col `}>
                    <label htmlFor={`email`} className={`text-[16px] text-primaryColor pl-2`}>Email</label>
                    <div id={'email'}
                        className={`h-[46px] pt-3 w-full text-primaryColor border-[1px] bg-white border-gray-300 rounded-full  ps-[20px]`}
                    >{userProfile?.email || session?.user?.email || "email@example.com"}</div>
                </div>
                
                <Button onClick={() => route.push("/dashboard/editprofile")}
                  
                    color={`blue`}
                    className={`bg-primaryColor text-white mt-2`}
                >
                    Update Profile
                </Button>
            </div>
        </div>
    );
}

export default ViewProfileComponent;
